import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import PaymentService from "./payment.service.js";

class PaymentController {
  createPayment = asyncHandler(async (req, res) => {
    const result = await PaymentService.createPayment(
      req.user,
      req.body
    );

    return res.status(201).json(
      new ApiResponse(
        201,
        result,
        "Razorpay order created successfully."
      )
    );
  });

  verifyPayment = asyncHandler(async (req, res) => {
    const result = await PaymentService.verifyPayment(
      req.user,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Payment verified successfully."
      )
    );
  });

  refundPayment = asyncHandler(async (req, res) => {
    const result = await PaymentService.refundPayment(
      req.user,
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Refund processed successfully."
      )
    );
  });

  getAllPayments = asyncHandler(async (req, res) => {
    const result = await PaymentService.getAllPayments(
      req.user
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Payments fetched successfully."
      )
    );
  });

  getPaymentById = asyncHandler(async (req, res) => {
    const result = await PaymentService.getPaymentById(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        result,
        "Payment fetched successfully."
      )
    );
  });

  deletePayment = asyncHandler(async (req, res) => {
    await PaymentService.deletePayment(
      req.user,
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Payment deleted successfully."
      )
    );
  });
}

export default new PaymentController();