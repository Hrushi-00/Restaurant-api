import { body, param } from "express-validator";

const QR_STATUS = ["ACTIVE", "INACTIVE"];

export const createQrMenuValidation = [
  body("tableId")
    .notEmpty()
    .withMessage("Table ID is required")
    .isMongoId()
    .withMessage("Invalid Table ID"),
];

export const updateQrMenuStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid QR Menu ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(QR_STATUS)
    .withMessage("Invalid status"),
];

export const qrMenuIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid QR Menu ID"),
];

export const scanQrValidation = [
  param("qrCode")
    .trim()
    .notEmpty()
    .withMessage("QR Code is required"),
];