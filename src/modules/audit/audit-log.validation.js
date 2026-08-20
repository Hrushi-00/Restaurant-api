import { param, query } from "express-validator";

export const auditLogIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Audit Log ID."),
];

export const auditLogUserValidation = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid User ID."),
];

export const auditLogRecordValidation = [
  param("recordId")
    .isMongoId()
    .withMessage("Invalid Record ID."),
];

export const auditLogModuleValidation = [
  param("module")
    .notEmpty()
    .withMessage("Module is required.")
    .isIn([
      "AUTH",
      "ORDER",
      "PAYMENT",
      "INVENTORY",
      "PURCHASE",
      "SUPPLIER",
      "MENU",
      "CATEGORY",
      "TABLE",
      "KOT",
      "STAFF",
      "QR_MENU",
      "NOTIFICATION",
      "SYSTEM",
    ])
    .withMessage("Invalid module."),
];

export const auditLogListValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage(
      "Limit must be between 1 and 100."
    ),

  query("userId")
    .optional()
    .isMongoId()
    .withMessage("Invalid User ID."),

  query("action")
    .optional()
    .isIn([
      "LOGIN",
      "LOGOUT",
      "CREATE",
      "UPDATE",
      "DELETE",
      "APPROVE",
      "CANCEL",
      "PAYMENT",
      "STOCK_IN",
      "STOCK_OUT",
    ])
    .withMessage("Invalid action."),

  query("module")
    .optional()
    .isIn([
      "AUTH",
      "ORDER",
      "PAYMENT",
      "INVENTORY",
      "PURCHASE",
      "SUPPLIER",
      "MENU",
      "CATEGORY",
      "TABLE",
      "KOT",
      "STAFF",
      "QR_MENU",
      "NOTIFICATION",
      "SYSTEM",
    ])
    .withMessage("Invalid module."),

  query("fromDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid from date."),

  query("toDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid to date."),
];