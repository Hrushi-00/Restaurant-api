import Payment from "./payment.model.js";

class PaymentRepository {
  async create(data) {
    return await Payment.create(data);
  }

  async findById(id) {
    return await Payment.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("orderId")
      .populate("customerId");
  }

  async findByInvoiceNumber(invoiceNumber) {
    return await Payment.findOne({
      invoiceNumber,
      isDeleted: false,
    });
  }

  async findByRazorpayOrderId(razorpayOrderId) {
    return await Payment.findOne({
      razorpayOrderId,
      isDeleted: false,
    });
  }

  async findAllByTenant(tenantId) {
    return await Payment.find({
      tenantId,
      isDeleted: false,
    })
      .populate("orderId")
      .populate("customerId")
      .sort({
        createdAt: -1,
      });
  }

  async update(id, data) {
    return await Payment.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async markPaymentSuccess(
    id,
    {
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod,
      paidAmount,
    }
  ) {
    return await Payment.findByIdAndUpdate(
      id,
      {
        paymentStatus: "PAID",
        paymentMethod,
        paidAmount,
        remainingAmount: 0,
        razorpayPaymentId,
        razorpaySignature,
        paidAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async markPaymentFailed(id) {
    return await Payment.findByIdAndUpdate(
      id,
      {
        paymentStatus: "FAILED",
      },
      {
        new: true,
      }
    );
  }

  async markPartialPayment(
    id,
    paidAmount,
    remainingAmount
  ) {
    return await Payment.findByIdAndUpdate(
      id,
      {
        paymentStatus: "PARTIAL",
        paidAmount,
        remainingAmount,
      },
      {
        new: true,
      }
    );
  }

  async refundPayment(
    id,
    refundAmount,
    refundReason
  ) {
    return await Payment.findByIdAndUpdate(
      id,
      {
        paymentStatus: "REFUNDED",
        refundAmount,
        refundReason,
      },
      {
        new: true,
      }
    );
  }

  async softDelete(id) {
    return await Payment.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
  }

  async countByTenant(tenantId) {
    return await Payment.countDocuments({
      tenantId,
      isDeleted: false,
    });
  }
}

export default new PaymentRepository();