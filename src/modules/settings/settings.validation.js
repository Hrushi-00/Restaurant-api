import { body } from "express-validator";

const validateTime = (value) => {
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
    throw new Error(
      "Time must be in HH:mm format."
    );
  }

  return true;
};

export const updateSettingsValidation = [
  body("restaurantName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
      "Restaurant name cannot be empty."
    )
    .isLength({ max: 150 })
    .withMessage(
      "Restaurant name cannot exceed 150 characters."
    ),

  body("logo")
    .optional()
    .isString()
    .withMessage("Logo must be a string."),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Invalid phone number."),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address."),

  body("address")
    .optional()
    .isObject()
    .withMessage("Address must be an object."),

  body("address.street")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage(
      "Street cannot exceed 200 characters."
    ),

  body("address.city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(
      "City cannot exceed 100 characters."
    ),

  body("address.state")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(
      "State cannot exceed 100 characters."
    ),

  body("address.pincode")
    .optional()
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage(
      "Invalid pincode."
    ),

  body("address.country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(
      "Country cannot exceed 100 characters."
    ),

  body("tax")
    .optional()
    .isObject()
    .withMessage("Tax must be an object."),

  body("tax.enabled")
    .optional()
    .isBoolean()
    .withMessage(
      "Tax enabled must be true or false."
    ),

  body("tax.gstEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "GST enabled must be true or false."
    ),

  body("tax.gstNumber")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage(
      "GST number cannot exceed 30 characters."
    ),

  body("tax.taxPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage(
      "Tax percentage must be between 0 and 100."
    ),

  body("currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 5 })
    .withMessage(
      "Invalid currency."
    ),

  body("orderSettings")
    .optional()
    .isObject()
    .withMessage(
      "Order settings must be an object."
    ),

  body("orderSettings.dineInEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "dineInEnabled must be true or false."
    ),

  body("orderSettings.takeawayEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "takeawayEnabled must be true or false."
    ),

  body("orderSettings.deliveryEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "deliveryEnabled must be true or false."
    ),

  body("orderSettings.onlineOrderEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "onlineOrderEnabled must be true or false."
    ),

  body("paymentSettings")
    .optional()
    .isObject()
    .withMessage(
      "Payment settings must be an object."
    ),

  body("paymentSettings.cashEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "cashEnabled must be true or false."
    ),

  body("paymentSettings.upiEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "upiEnabled must be true or false."
    ),

  body("paymentSettings.cardEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "cardEnabled must be true or false."
    ),

  body("paymentSettings.razorpayEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "razorpayEnabled must be true or false."
    ),

  body("invoiceSettings")
    .optional()
    .isObject()
    .withMessage(
      "Invoice settings must be an object."
    ),

  body("invoiceSettings.invoicePrefix")
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(
      "Invoice prefix must be between 1 and 20 characters."
    ),

  body("invoiceSettings.showTax")
    .optional()
    .isBoolean()
    .withMessage(
      "showTax must be true or false."
    ),

  body("invoiceSettings.showRestaurantAddress")
    .optional()
    .isBoolean()
    .withMessage(
      "showRestaurantAddress must be true or false."
    ),

  body("invoiceSettings.footerText")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage(
      "Footer text cannot exceed 300 characters."
    ),

  body("notificationSettings")
    .optional()
    .isObject()
    .withMessage(
      "Notification settings must be an object."
    ),

  body("notificationSettings.lowStockEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "lowStockEnabled must be true or false."
    ),

  body("notificationSettings.newOrderEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "newOrderEnabled must be true or false."
    ),

  body("notificationSettings.paymentEnabled")
    .optional()
    .isBoolean()
    .withMessage(
      "paymentEnabled must be true or false."
    ),

  body("businessHours")
    .optional()
    .isObject()
    .withMessage(
      "Business hours must be an object."
    ),
];

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

days.forEach((day) => {
  updateSettingsValidation.push(
    body(`businessHours.${day}.open`)
      .optional()
      .custom(validateTime),

    body(`businessHours.${day}.close`)
      .optional()
      .custom(validateTime),

    body(`businessHours.${day}.enabled`)
      .optional()
      .isBoolean()
      .withMessage(
        `${day}.enabled must be true or false.`
      )
  );
});