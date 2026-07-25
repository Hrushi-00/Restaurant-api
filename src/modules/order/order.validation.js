import { body } from "express-validator";

export const createOrderValidation = [
  body("customerName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Customer name cannot exceed 100 characters"),

  body("customerPhone")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Customer phone must be a valid 10-digit number"),

  body("orderType")
    .notEmpty()
    .withMessage("Order type is required")
    .isIn(["DINE_IN", "TAKEAWAY", "DELIVERY"])
    .withMessage("Invalid order type"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one item"),

  body("items.*.menuId")
    .notEmpty()
    .withMessage("Menu ID is required")
    .isMongoId()
    .withMessage("Invalid Menu ID"),

  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount cannot be negative"),

  body("paymentMethod")
    .optional()
    .isIn(["CASH", "CARD", "UPI", "ONLINE"])
    .withMessage("Invalid payment method"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];

export const updateOrderValidation = [
  body("customerName")
    .optional()
    .trim()
    .isLength({ max: 100 }),

  body("customerPhone")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Invalid phone number"),

  body("orderType")
    .optional()
    .isIn(["DINE_IN", "TAKEAWAY", "DELIVERY"]),

  body("items")
    .optional()
    .isArray({ min: 1 }),

  body("items.*.menuId")
    .optional()
    .isMongoId(),

  body("items.*.quantity")
    .optional()
    .isInt({ min: 1 }),

  body("discount")
    .optional()
    .isFloat({ min: 0 }),

  body("paymentMethod")
    .optional()
    .isIn(["CASH", "CARD", "UPI", "ONLINE"]),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 }),
];

export const updateOrderStatusValidation = [
  body("orderStatus")
    .notEmpty()
    .withMessage("Order status is required")
    .isIn([
      "PENDING",
      "CONFIRMED",
      "PREPARING",
      "READY",
      "SERVED",
      "COMPLETED",
      "CANCELLED",
    ])
    .withMessage("Invalid order status"),
];

export const updatePaymentStatusValidation = [
  body("paymentStatus")
    .notEmpty()
    .withMessage("Payment status is required")
    .isIn([
      "UNPAID",
      "PARTIAL",
      "PAID",
      "REFUNDED",
    ])
    .withMessage("Invalid payment status"),
];