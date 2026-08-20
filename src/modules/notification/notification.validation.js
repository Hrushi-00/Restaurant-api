import { body, param, query } from "express-validator";

export const createNotificationValidation = [
  body("recipientId")
    .isMongoId()
    .withMessage("Invalid Recipient ID."),

  body("type")
    .notEmpty()
    .withMessage("Notification type is required.")
    .isIn([
      "LOW_STOCK",
      "NEW_ORDER",
      "ORDER_STATUS",
      "PAYMENT_SUCCESS",
      "PAYMENT_FAILED",
      "PURCHASE_RECEIVED",
      "PURCHASE_PENDING",
      "KOT_READY",
      "SYSTEM",
    ])
    .withMessage("Invalid notification type."),

  body("title")
    .notEmpty()
    .withMessage("Notification title is required.")
    .trim()
    .isLength({ max: 150 })
    .withMessage(
      "Notification title cannot exceed 150 characters."
    ),

  body("message")
    .notEmpty()
    .withMessage("Notification message is required.")
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Notification message cannot exceed 500 characters."
    ),

  body("referenceType")
    .optional()
    .isIn([
      "ORDER",
      "PAYMENT",
      "PURCHASE",
      "INVENTORY",
      "KOT",
      "SYSTEM",
    ])
    .withMessage("Invalid reference type."),

  body("referenceId")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid Reference ID."),

  body("metadata")
    .optional()
    .isObject()
    .withMessage("Metadata must be an object."),
];

export const notificationIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Notification ID."),
];

export const notificationListValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid page."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100."),

  query("isRead")
    .optional()
    .isBoolean()
    .withMessage("isRead must be true or false."),

  query("type")
    .optional()
    .isIn([
      "LOW_STOCK",
      "NEW_ORDER",
      "ORDER_STATUS",
      "PAYMENT_SUCCESS",
      "PAYMENT_FAILED",
      "PURCHASE_RECEIVED",
      "PURCHASE_PENDING",
      "KOT_READY",
      "SYSTEM",
    ])
    .withMessage("Invalid notification type."),
];