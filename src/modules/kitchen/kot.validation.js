import { body, param } from "express-validator";

const KOT_STATUS = [
  "NEW",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "SERVED",
];

const PRIORITY = [
  "LOW",
  "NORMAL",
  "HIGH",
  "URGENT",
];

export const createKOTValidation = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid Order ID"),

  body("tableId")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid Table ID"),

  body("tokenNumber")
    .notEmpty()
    .withMessage("Token number is required")
    .isInt({ min: 1 })
    .withMessage("Invalid token number"),

  body("priority")
    .optional()
    .isIn(PRIORITY)
    .withMessage("Invalid priority"),

  body("estimatedTime")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Estimated time must be greater than 0"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one item is required"),

  body("items.*.menuItemId")
    .notEmpty()
    .withMessage("Menu Item ID is required")
    .isMongoId()
    .withMessage("Invalid Menu Item ID"),

  body("items.*.name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("items.*.station")
    .optional()
    .isIn([
      "KITCHEN",
      "BAR",
      "DESSERT",
      "BAKERY",
    ])
    .withMessage("Invalid station"),

  body("items.*.notes")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Item notes cannot exceed 300 characters"),
];

export const updateKOTValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid KOT ID"),

  body("priority")
    .optional()
    .isIn(PRIORITY)
    .withMessage("Invalid priority"),

  body("estimatedTime")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Estimated time must be greater than 0"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];

export const updateKOTStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid KOT ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(KOT_STATUS)
    .withMessage("Invalid status"),
];