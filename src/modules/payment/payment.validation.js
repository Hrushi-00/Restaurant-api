import { body, param } from "express-validator";

export const createPaymentValidation = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required.")
    .isMongoId()
    .withMessage("Invalid Order ID."),

  body("customerId")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Customer ID."),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isFloat({ min: 1 })
    .withMessage("Amount must be greater than 0."),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount cannot be negative."),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax cannot be negative."),

  body("tip")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tip cannot be negative."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

export const verifyPaymentValidation = [
  body("paymentId")
    .notEmpty()
    .withMessage("Payment ID is required.")
    .isMongoId()
    .withMessage("Invalid Payment ID."),

  body("razorpayOrderId")
    .notEmpty()
    .withMessage("Razorpay Order ID is required."),

  body("razorpayPaymentId")
    .notEmpty()
    .withMessage("Razorpay Payment ID is required."),

  body("razorpaySignature")
    .notEmpty()
    .withMessage("Razorpay Signature is required."),
];

export const refundPaymentValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Payment ID."),

  body("refundAmount")
    .notEmpty()
    .withMessage("Refund amount is required.")
    .isFloat({ min: 1 })
    .withMessage("Refund amount must be greater than 0."),

  body("refundReason")
    .notEmpty()
    .withMessage("Refund reason is required.")
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage("Refund reason must be between 3 and 500 characters."),
];

export const paymentIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Payment ID."),
];