import { body, param, query } from "express-validator";

const purchaseItemValidation = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one purchase item is required."),

  body("items.*.inventoryId")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),

  body("items.*.quantity")
    .isFloat({ gt: 0 })
    .withMessage("Quantity must be greater than 0."),

  body("items.*.purchasePrice")
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be greater than or equal to 0."),

  body("items.*.tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be greater than or equal to 0."),

  body("items.*.discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be greater than or equal to 0."),
];

export const createPurchaseValidation = [
  body("supplierId")
    .isMongoId()
    .withMessage("Invalid Supplier ID."),

  ...purchaseItemValidation,

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be greater than or equal to 0."),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be greater than or equal to 0."),

  body("shippingCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Shipping charge must be greater than or equal to 0."),

  body("paymentMethod")
    .optional()
    .isIn([
      "CASH",
      "UPI",
      "CARD",
      "BANK_TRANSFER",
      "CREDIT",
    ])
    .withMessage("Invalid payment method."),

  body("paidAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Paid amount must be greater than or equal to 0."),

  body("purchaseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid purchase date."),

  body("expectedDeliveryDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid expected delivery date."),

  body("invoiceNumber")
    .optional({ nullable: true })
    .trim(),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

export const updatePurchaseValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Purchase ID."),

  body("supplierId")
    .optional()
    .isMongoId()
    .withMessage("Invalid Supplier ID."),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be greater than or equal to 0."),

  body("tax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax must be greater than or equal to 0."),

  body("shippingCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Shipping charge must be greater than or equal to 0."),

  body("paymentMethod")
    .optional()
    .isIn([
      "CASH",
      "UPI",
      "CARD",
      "BANK_TRANSFER",
      "CREDIT",
    ])
    .withMessage("Invalid payment method."),

  body("paidAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Paid amount must be greater than or equal to 0."),

  body("expectedDeliveryDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid expected delivery date."),

  body("invoiceNumber")
    .optional({ nullable: true })
    .trim(),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

export const receivePurchaseValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Purchase ID."),
];

export const cancelPurchaseValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Purchase ID."),
];

export const purchaseIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Purchase ID."),
];

export const purchaseListValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page."),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid limit."),

  query("search")
    .optional()
    .trim(),

  query("supplierId")
    .optional()
    .isMongoId()
    .withMessage("Invalid Supplier ID."),

  query("status")
    .optional()
    .isIn([
      "DRAFT",
      "ORDERED",
      "PARTIAL",
      "RECEIVED",
      "CANCELLED",
    ])
    .withMessage("Invalid purchase status."),

  query("paymentStatus")
    .optional()
    .isIn([
      "UNPAID",
      "PARTIALLY_PAID",
      "PAID",
    ])
    .withMessage("Invalid payment status."),

  query("fromDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid from date."),

  query("toDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid to date."),
];