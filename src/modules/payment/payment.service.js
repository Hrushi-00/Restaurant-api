import crypto from "crypto";

import {
  getRazorpayClient,
  getRazorpayKeyId,
  getRazorpayKeySecret,
} from "./razorpay.js";

import PaymentRepository from "./payment.repository.js";
import RestaurantRepository from "../restaurant/restaurant.repository.js";
import OrderRepository from "../order/order.repository.js";

import {
  paymentResponse,
  paymentListResponse,
} from "./payment.dto.js";

import ApiError from "../../utils/ApiError.js";

class PaymentService {
  async resolveTenantId(user) {
    if (user.tenantId) {
      return user.tenantId;
    }

    const restaurant =
      await RestaurantRepository.findByOwnerId(user.id);

    if (!restaurant) {
      throw new ApiError(
        404,
        "Restaurant not found."
      );
    }

    return restaurant._id;
  }

  generateInvoiceNumber() {
    return `INV-${Date.now()}-${crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()}`;
  }

  async createPayment(user, payload) {
    const tenantId =
      await this.resolveTenantId(user);

    const order =
      await OrderRepository.findById(
        payload.orderId,
        tenantId
      );

    if (!order) {
      throw new ApiError(
        404,
        "Order not found."
      );
    }

    const invoiceNumber =
      this.generateInvoiceNumber();

    const totalAmount =
      payload.amount -
      (payload.discount || 0) +
      (payload.tax || 0) +
      (payload.tip || 0);

    const razorpay = getRazorpayClient();

    const razorpayOrder =
      await razorpay.orders.create({
        amount: Math.round(totalAmount * 100),
        currency: "INR",
        receipt: invoiceNumber,
        payment_capture: 1,
      });

    const payment =
      await PaymentRepository.create({
        tenantId,

        orderId: payload.orderId,

        customerId:
          payload.customerId || null,

        invoiceNumber,

        amount: payload.amount,

        discount:
          payload.discount || 0,

        tax: payload.tax || 0,

        tip: payload.tip || 0,

        totalAmount,

        paidAmount: 0,

        remainingAmount:
          totalAmount,

        paymentMethod:
          payload.paymentMethod ||
          "UPI",

        paymentStatus:
          "PENDING",

        razorpayOrderId:
          razorpayOrder.id,

        notes:
          payload.notes || "",
      });

    const populatedPayment =
      await PaymentRepository.findById(
        payment._id
      );

    return {
      payment:
        paymentResponse(
          populatedPayment
        ),

      razorpay: {
        key: getRazorpayKeyId(),

        orderId:
          razorpayOrder.id,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        invoiceNumber,
      },
    };
  }

    async verifyPayment(user, payload) {
    const tenantId = await this.resolveTenantId(user);

    const payment = await PaymentRepository.findById(
      payload.paymentId
    );

    if (
      !payment ||
      String(payment.tenantId) !== String(tenantId)
    ) {
      throw new ApiError(404, "Payment not found.");
    }

    const body =
      payload.razorpayOrderId +
      "|" +
      payload.razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        getRazorpayKeySecret()
      )
      .update(body)
      .digest("hex");

    if (
      expectedSignature !==
      payload.razorpaySignature
    ) {
      await PaymentRepository.markPaymentFailed(
        payment._id
      );

      throw new ApiError(
        400,
        "Payment verification failed."
      );
    }

    const updatedPayment =
      await PaymentRepository.markPaymentSuccess(
        payment._id,
        {
          razorpayPaymentId:
            payload.razorpayPaymentId,

          razorpaySignature:
            payload.razorpaySignature,

          paymentMethod:
            payload.paymentMethod || "UPI",

          paidAmount:
            payment.totalAmount,
        }
      );

    if (
      OrderRepository.updatePaymentStatus
    ) {
      await OrderRepository.updatePaymentStatus(
        payment.orderId._id,
        {
          paymentStatus: "PAID",
          orderStatus: "COMPLETED",
        }
      );
    }

    const populatedPayment =
      await PaymentRepository.findById(
        updatedPayment._id
      );

    return paymentResponse(
      populatedPayment
    );
  }

  async refundPayment(
    user,
    id,
    payload
  ) {
    const tenantId =
      await this.resolveTenantId(user);

    const payment =
      await PaymentRepository.findById(id);

    if (
      !payment ||
      String(payment.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Payment not found."
      );
    }

    if (
      payment.paymentStatus !== "PAID"
    ) {
      throw new ApiError(
        400,
        "Only successful payments can be refunded."
      );
    }

    const razorpay = getRazorpayClient();

    const refund =
      await razorpay.payments.refund(
        payment.razorpayPaymentId,
        {
          amount: Math.round(
            payload.refundAmount * 100
          ),
          notes: {
            reason:
              payload.refundReason,
          },
        }
      );

    const updatedPayment =
      await PaymentRepository.refundPayment(
        payment._id,
        payload.refundAmount,
        payload.refundReason
      );

    return {
      payment:
        paymentResponse(
          updatedPayment
        ),
      refund,
    };
  }

  async getAllPayments(user) {
    const tenantId =
      await this.resolveTenantId(user);

    const payments =
      await PaymentRepository.findAllByTenant(
        tenantId
      );

    return paymentListResponse(payments);
  }

  async getPaymentById(user, id) {
    const tenantId =
      await this.resolveTenantId(user);

    const payment =
      await PaymentRepository.findById(id);

    if (
      !payment ||
      String(payment.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Payment not found."
      );
    }

    return paymentResponse(payment);
  }

  async deletePayment(user, id) {
    const tenantId =
      await this.resolveTenantId(user);

    const payment =
      await PaymentRepository.findById(id);

    if (
      !payment ||
      String(payment.tenantId) !==
        String(tenantId)
    ) {
      throw new ApiError(
        404,
        "Payment not found."
      );
    }

    if (payment.paymentStatus === "PAID") {
      throw new ApiError(
        400,
        "Paid payments cannot be deleted."
      );
    }

    await PaymentRepository.softDelete(id);

    return null;
  }
}

export default new PaymentService();
