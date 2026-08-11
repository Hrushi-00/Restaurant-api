import { body, param, query } from "express-validator";

export const createSupplierValidation = [
  body("supplierCode")
    .trim()
    .notEmpty()
    .withMessage("Supplier code is required."),

  body("supplierName")
    .trim()
    .notEmpty()
    .withMessage("Supplier name is required."),

  body("contactPerson")
    .trim()
    .notEmpty()
    .withMessage("Contact person is required."),

  body("email")
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("alternatePhone")
    .optional({ nullable: true, checkFalsy: true })
    .trim(),

  body("gstNumber")
    .optional({ nullable: true, checkFalsy: true })
    .trim(),

  body("address")
    .optional()
    .trim(),

  body("city")
    .optional()
    .trim(),

  body("state")
    .optional()
    .trim(),

  body("country")
    .optional()
    .trim(),

  body("pincode")
    .optional()
    .trim(),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

export const updateSupplierValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Supplier ID."),

  body("supplierCode")
    .optional()
    .trim(),

  body("supplierName")
    .optional()
    .trim(),

  body("contactPerson")
    .optional()
    .trim(),

  body("email")
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address."),

  body("phone")
    .optional()
    .trim(),

  body("alternatePhone")
    .optional()
    .trim(),

  body("gstNumber")
    .optional()
    .trim(),

  body("address")
    .optional()
    .trim(),

  body("city")
    .optional()
    .trim(),

  body("state")
    .optional()
    .trim(),

  body("country")
    .optional()
    .trim(),

  body("pincode")
    .optional()
    .trim(),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

export const updateSupplierStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Supplier ID."),

  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn([
      "ACTIVE",
      "INACTIVE",
    ])
    .withMessage("Invalid status."),
];

export const supplierIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid Supplier ID."),
];

export const supplierListValidation = [
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

  query("status")
    .optional()
    .isIn([
      "ACTIVE",
      "INACTIVE",
    ])
    .withMessage("Invalid status."),
];