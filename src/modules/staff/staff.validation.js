import { body } from "express-validator";

export const createStaffValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Staff name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn([
      "MANAGER",
      "CHEF",
      "WAITER",
      "CASHIER",
      "KITCHEN_STAFF",
    ])
    .withMessage("Invalid role"),

  body("salary")
    .optional()
    .isNumeric()
    .withMessage("Salary must be a number"),

  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid joining date"),

  body("shift")
    .optional()
    .isIn(["MORNING", "EVENING", "FULL_DAY"])
    .withMessage("Invalid shift"),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

export const updateStaffValidation = [
  body("name").optional().trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone").optional().trim(),

  body("role")
    .optional()
    .isIn([
      "MANAGER",
      "CHEF",
      "WAITER",
      "CASHIER",
      "KITCHEN_STAFF",
    ])
    .withMessage("Invalid role"),

  body("salary")
    .optional()
    .isNumeric()
    .withMessage("Salary must be a number"),

  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid joining date"),

  body("shift")
    .optional()
    .isIn(["MORNING", "EVENING", "FULL_DAY"])
    .withMessage("Invalid shift"),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];