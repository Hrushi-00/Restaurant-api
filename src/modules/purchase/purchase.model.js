import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema(
  {
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const purchaseSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    purchaseNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
      index: true,
    },

    items: {
      type: [purchaseItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Purchase must contain at least one item.",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    grandTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: [
        "CASH",
        "UPI",
        "CARD",
        "BANK_TRANSFER",
        "CREDIT",
      ],
      default: "CREDIT",
    },

    paymentStatus: {
      type: String,
      enum: [
        "UNPAID",
        "PARTIALLY_PAID",
        "PAID",
      ],
      default: "UNPAID",
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    purchaseStatus: {
      type: String,
      enum: [
        "DRAFT",
        "ORDERED",
        "PARTIAL",
        "RECEIVED",
        "CANCELLED",
      ],
      default: "DRAFT",
      index: true,
    },

    purchaseDate: {
      type: Date,
      default: Date.now,
    },

    expectedDeliveryDate: {
      type: Date,
      default: null,
    },

    receivedAt: {
      type: Date,
      default: null,
    },

    invoiceNumber: {
      type: String,
      trim: true,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

purchaseSchema.index(
  {
    tenantId: 1,
    purchaseNumber: 1,
  },
  {
    unique: true,
  }
);

purchaseSchema.index({
  tenantId: 1,
  purchaseStatus: 1,
});

purchaseSchema.index({
  tenantId: 1,
  purchaseDate: -1,
});

const Purchase =
  mongoose.models.Purchase ||
  mongoose.model("Purchase", purchaseSchema);

export default Purchase;