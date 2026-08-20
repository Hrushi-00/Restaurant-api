import { body, param, query } from "express-validator";

const discountTypes = [
  "FLAT",
  "PERCENTAGE",
  "BOGO",
  "FESTIVAL",
];

export const createCouponValidation = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required.")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Coupon code must be between 3 and 30 characters."
    )
    .matches(/^[A-Z0-9_-]+$/i)
    .withMessage(
      "Coupon code can contain only letters, numbers, hyphens and underscores."
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Description cannot exceed 500 characters."
    ),

  body("discountType")
    .notEmpty()
    .withMessage("Discount type is required.")
    .isIn(discountTypes)
    .withMessage("Invalid discount type."),

  body("discountValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Discount value must be greater than or equal to 0."
    ),

  body("buyQuantity")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(
      "Buy quantity must be at least 1."
    ),

  body("getQuantity")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(
      "Get quantity must be at least 1."
    ),

  body("minimumOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Minimum order amount cannot be negative."
    ),

  body("maximumDiscountAmount")
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage(
      "Maximum discount amount cannot be negative."
    ),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Invalid start date."),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required.")
    .isISO8601()
    .withMessage("Invalid end date."),

  body("usageLimit")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(
      "Usage limit must be at least 1."
    ),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage(
      "isActive must be true or false."
    ),
];

export const updateCouponValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Coupon ID."),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Coupon code must be between 3 and 30 characters."
    )
    .matches(/^[A-Z0-9_-]+$/i)
    .withMessage(
      "Coupon code can contain only letters, numbers, hyphens and underscores."
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Description cannot exceed 500 characters."
    ),

  body("discountType")
    .optional()
    .isIn(discountTypes)
    .withMessage("Invalid discount type."),

  body("discountValue")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Discount value must be greater than or equal to 0."
    ),

  body("buyQuantity")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(
      "Buy quantity must be at least 1."
    ),

  body("getQuantity")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(
      "Get quantity must be at least 1."
    ),

  body("minimumOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage(
      "Minimum order amount cannot be negative."
    ),

  body("maximumDiscountAmount")
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage(
      "Maximum discount amount cannot be negative."
    ),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date."),

  body("endDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid end date."),

  body("usageLimit")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage(
      "Usage limit must be at least 1."
    ),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage(
      "isActive must be true or false."
    ),
];

export const couponIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Coupon ID."),
];

export const couponStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Coupon ID."),

  body("isActive")
    .notEmpty()
    .withMessage("isActive is required.")
    .isBoolean()
    .withMessage(
      "isActive must be true or false."
    ),
];

export const couponListValidation = [
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

  query("code")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage(
      "Coupon code cannot exceed 30 characters."
    ),

  query("discountType")
    .optional()
    .isIn(discountTypes)
    .withMessage("Invalid discount type."),

  query("isActive")
    .optional()
    .isBoolean()
    .withMessage(
      "isActive must be true or false."
    ),

  query("fromDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid from date."),

  query("toDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid to date."),
];

export const validateCouponValidation = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required."),

  body("orderAmount")
    .notEmpty()
    .withMessage("Order amount is required.")
    .isFloat({ min: 0 })
    .withMessage(
      "Order amount must be greater than or equal to 0."
    ),
];