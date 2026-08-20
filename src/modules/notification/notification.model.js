import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "LOW_STOCK",
        "NEW_ORDER",
        "ORDER_STATUS",
        "PAYMENT_SUCCESS",
        "PAYMENT_FAILED",
        "PURCHASE_RECEIVED",
        "PURCHASE_PENDING",
        "KOT_READY",
        "SYSTEM",
      ],
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    referenceType: {
      type: String,
      enum: [
        "ORDER",
        "PAYMENT",
        "PURCHASE",
        "INVENTORY",
        "KOT",
        "SYSTEM",
      ],
      default: "SYSTEM",
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({
  tenantId: 1,
  recipientId: 1,
  isRead: 1,
  createdAt: -1,
});

notificationSchema.index({
  tenantId: 1,
  type: 1,
  createdAt: -1,
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    notificationSchema
  );

export default Notification;