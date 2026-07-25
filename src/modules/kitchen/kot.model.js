import mongoose from "mongoose";

const kotItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    station: {
      type: String,
      enum: [
        "KITCHEN",
        "BAR",
        "DESSERT",
        "BAKERY",
      ],
      default: "KITCHEN",
    },

    status: {
      type: String,
      enum: [
        "NEW",
        "PREPARING",
        "READY",
        "SERVED",
      ],
      default: "NEW",
    },
  },
  { _id: false }
);

const kotSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      default: null,
    },

    tokenNumber: {
      type: Number,
      required: true,
    },

    items: [kotItemSchema],

    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
      default: "NORMAL",
    },

    status: {
      type: String,
      enum: [
        "NEW",
        "ACCEPTED",
        "PREPARING",
        "READY",
        "SERVED",
      ],
      default: "NEW",
      index: true,
    },

    chefId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    estimatedTime: {
      type: Number,
      default: 15,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
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

kotSchema.index({
  tenantId: 1,
  tokenNumber: 1,
});

kotSchema.index({
  tenantId: 1,
  status: 1,
});

export default mongoose.model("KOT", kotSchema);