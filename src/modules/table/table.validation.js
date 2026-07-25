import { body } from "express-validator";
import { TABLE_STATUS } from "./table.model.js";

export const createTableValidation = [
  body("tableNumber")
    .trim()
    .notEmpty()
    .withMessage("Table number is required"),

  body("tableName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Table name must not exceed 100 characters"),

  body("capacity")
    .notEmpty()
    .withMessage("Capacity is required")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  body("section")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Section must not exceed 100 characters"),

  body("qrCode")
    .optional()
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];

export const updateTableValidation = [
  body("tableNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Table number cannot be empty"),

  body("tableName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Table name must not exceed 100 characters"),

  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),

  body("section")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Section must not exceed 100 characters"),

  body("qrCode")
    .optional()
    .trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];

export const updateTableStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(TABLE_STATUS))
    .withMessage("Invalid table status"),
];