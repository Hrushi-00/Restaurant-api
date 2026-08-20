import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      unique: true,
      index: true,
    },

    restaurantName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    logo: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    address: {
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      pincode: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "India",
      },
    },

    tax: {
      enabled: {
        type: Boolean,
        default: true,
      },

      gstEnabled: {
        type: Boolean,
        default: false,
      },

      gstNumber: {
        type: String,
        trim: true,
        default: "",
      },

      taxPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },

    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    orderSettings: {
      dineInEnabled: {
        type: Boolean,
        default: true,
      },

      takeawayEnabled: {
        type: Boolean,
        default: true,
      },

      deliveryEnabled: {
        type: Boolean,
        default: false,
      },

      onlineOrderEnabled: {
        type: Boolean,
        default: true,
      },
    },

    paymentSettings: {
      cashEnabled: {
        type: Boolean,
        default: true,
      },

      upiEnabled: {
        type: Boolean,
        default: true,
      },

      cardEnabled: {
        type: Boolean,
        default: true,
      },

      razorpayEnabled: {
        type: Boolean,
        default: false,
      },
    },

    invoiceSettings: {
      invoicePrefix: {
        type: String,
        default: "INV",
        trim: true,
      },

      showTax: {
        type: Boolean,
        default: true,
      },

      showRestaurantAddress: {
        type: Boolean,
        default: true,
      },

      footerText: {
        type: String,
        default: "Thank you for visiting!",
        maxlength: 300,
      },
    },

    notificationSettings: {
      lowStockEnabled: {
        type: Boolean,
        default: true,
      },

      newOrderEnabled: {
        type: Boolean,
        default: true,
      },

      paymentEnabled: {
        type: Boolean,
        default: true,
      },
    },

    businessHours: {
      monday: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
        enabled: { type: Boolean, default: true },
      },

      tuesday: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
        enabled: { type: Boolean, default: true },
      },

      wednesday: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
        enabled: { type: Boolean, default: true },
      },

      thursday: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
        enabled: { type: Boolean, default: true },
      },

      friday: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
        enabled: { type: Boolean, default: true },
      },

      saturday: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
        enabled: { type: Boolean, default: true },
      },

      sunday: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" },
        enabled: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Settings =
  mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);

export default Settings;