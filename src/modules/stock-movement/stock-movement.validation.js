import { body, param, query } from "express-validator";

export const createStockMovementValidation = [
  body("inventoryId")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),

  body("movementType")
    .notEmpty()
    .withMessage("Movement type is required.")
    .isIn([
      "PURCHASE_IN",
      "SALE_OUT",
      "MANUAL_IN",
      "MANUAL_OUT",
      "ADJUSTMENT",
      "RETURN_IN",
      "RETURN_OUT",
      "WASTAGE",
    ])
    .withMessage("Invalid movement type."),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isFloat({ gt: 0 })
    .withMessage("Quantity must be greater than 0."),

  body("referenceType")
    .optional()
    .isIn([
      "PURCHASE",
      "ORDER",
      "KOT",
      "MANUAL",
      "ADJUSTMENT",
      "RETURN",
    ])
    .withMessage("Invalid reference type."),

  body("referenceId")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Reference ID."),

  body("reason")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Reason cannot exceed 500 characters."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
    body("newStock")
  .optional()
  .isFloat({ min: 0 })
  .withMessage(
    "New stock must be greater than or equal to 0."
  ),
];

export const stockMovementIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Stock Movement ID."),
];

export const inventoryMovementValidation = [
  param("inventoryId")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),
];

export const stockMovementListValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page."),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid limit."),

  query("inventoryId")
    .optional()
    .isMongoId()
    .withMessage("Invalid Inventory ID."),

  query("movementType")
    .optional()
    .isIn([
      "PURCHASE_IN",
      "SALE_OUT",
      "MANUAL_IN",
      "MANUAL_OUT",
      "ADJUSTMENT",
      "RETURN_IN",
      "RETURN_OUT",
      "WASTAGE",
    ])
    .withMessage("Invalid movement type."),

  query("referenceType")
    .optional()
    .isIn([
      "PURCHASE",
      "ORDER",
      "KOT",
      "MANUAL",
      "ADJUSTMENT",
      "RETURN",
    ])
    .withMessage("Invalid reference type."),

  query("fromDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid from date."),

  query("toDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid to date."),
];