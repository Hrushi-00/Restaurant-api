import { body } from "express-validator";

export const createMenuValidation = [
  body("categoryId")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category id"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Menu name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Menu name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("sku")
    .trim()
    .notEmpty()
    .withMessage("SKU is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be greater than or equal to 0"),

  body("preparationTime")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Preparation time must be at least 1 minute"),

  body("foodType")
    .optional()
    .isIn(["VEG", "NON_VEG", "EGG"])
    .withMessage("Invalid food type"),

  body("taxPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax percentage must be between 0 and 100"),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be true or false"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be true or false"),
];

export const updateMenuValidation = [
  body("categoryId")
    .optional()
    .isMongoId()
    .withMessage("Invalid category id"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Menu name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("sku")
    .optional()
    .trim(),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("discountPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount price must be greater than or equal to 0"),

  body("preparationTime")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Preparation time must be at least 1 minute"),

  body("foodType")
    .optional()
    .isIn(["VEG", "NON_VEG", "EGG"])
    .withMessage("Invalid food type"),

  body("taxPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax percentage must be between 0 and 100"),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be true or false"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be true or false"),
];