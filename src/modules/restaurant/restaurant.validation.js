import { body } from "express-validator";

export const createRestaurantValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Restaurant name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("address.street")
    .optional()
    .trim(),

  body("address.city")
    .optional()
    .trim(),

  body("address.state")
    .optional()
    .trim(),

  body("address.country")
    .optional()
    .trim(),

  body("address.pincode")
    .optional()
    .trim(),

  body("gstNumber")
    .optional()
    .trim(),

  body("fssaiNumber")
    .optional()
    .trim(),

  body("timezone")
    .optional()
    .trim(),

  body("currency")
    .optional()
    .trim(),
];

export const updateRestaurantValidation = [
  body("name").optional().trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone").optional().trim(),

  body("address.street").optional().trim(),
  body("address.city").optional().trim(),
  body("address.state").optional().trim(),
  body("address.country").optional().trim(),
  body("address.pincode").optional().trim(),

  body("gstNumber").optional().trim(),
  body("fssaiNumber").optional().trim(),

  body("timezone").optional().trim(),
  body("currency").optional().trim(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];