import { body, param } from "express-validator";

const RESERVATION_STATUS = [
  "PENDING",
  "CONFIRMED",
  "SEATED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

export const createReservationValidation = [
  body("tableId")
    .notEmpty()
    .withMessage("Table ID is required")
    .isMongoId()
    .withMessage("Invalid Table ID"),

  body("customerId")
    .optional()
    .isMongoId()
    .withMessage("Invalid Customer ID"),

  body("guestName")
    .trim()
    .notEmpty()
    .withMessage("Guest name is required"),

  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address"),

  body("reservationDate")
    .notEmpty()
    .withMessage("Reservation date is required")
    .isISO8601()
    .withMessage("Invalid reservation date"),

  body("timeSlot")
    .trim()
    .notEmpty()
    .withMessage("Time slot is required"),

  body("guestCount")
    .notEmpty()
    .withMessage("Guest count is required")
    .isInt({ min: 1 })
    .withMessage("Guest count must be at least 1"),

  body("specialRequest")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Special request cannot exceed 500 characters"),
];

export const reservationIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Reservation ID"),
];

export const updateReservationStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Reservation ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(RESERVATION_STATUS)
    .withMessage("Invalid reservation status"),
];