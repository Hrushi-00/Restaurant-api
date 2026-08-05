import { body, param, query } from "express-validator";

export const createInventoryValidation = [
  body("itemCode")
    .trim()
    .notEmpty()
    .withMessage("Item code is required."),

  body("itemName")
    .trim()
    .notEmpty()
    .withMessage("Item name is required."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required."),

  body("supplierId")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Supplier ID."),

  body("unit")
    .optional()
    .isIn([
      "PIECE",
      "KG",
      "GRAM",
      "LITRE",
      "ML",
      "PACK",
      "BOX",
      "BOTTLE",
    ])
    .withMessage("Invalid unit."),

  body("openingStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Opening stock must be greater than or equal to 0."),

  body("minimumStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum stock must be greater than or equal to 0."),

  body("maximumStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum stock must be greater than or equal to 0."),

  body("purchasePrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be greater than or equal to 0."),

  body("sellingPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Selling price must be greater than or equal to 0."),

  body("expiryDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid expiry date."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

export const updateInventoryValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),

  body("itemCode").optional().trim(),

  body("itemName").optional().trim(),

  body("category").optional().trim(),

  body("supplierId")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Supplier ID."),

  body("unit")
    .optional()
    .isIn([
      "PIECE",
      "KG",
      "GRAM",
      "LITRE",
      "ML",
      "PACK",
      "BOX",
      "BOTTLE",
    ])
    .withMessage("Invalid unit."),

  body("minimumStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum stock must be greater than or equal to 0."),

  body("maximumStock")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum stock must be greater than or equal to 0."),

  body("purchasePrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be greater than or equal to 0."),

  body("sellingPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Selling price must be greater than or equal to 0."),

  body("expiryDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid expiry date."),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

export const stockInValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isFloat({ gt: 0 })
    .withMessage("Quantity must be greater than 0."),
];

export const stockOutValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isFloat({ gt: 0 })
    .withMessage("Quantity must be greater than 0."),
];

export const stockAdjustmentValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isFloat()
    .withMessage("Invalid quantity."),

  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Adjustment reason is required."),
];

export const inventoryIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Inventory ID."),
];

export const inventoryListValidation = [
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

  query("category")
    .optional()
    .trim(),

  query("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status."),

  query("lowStock")
    .optional()
    .isBoolean()
    .withMessage("Invalid lowStock value."),
];