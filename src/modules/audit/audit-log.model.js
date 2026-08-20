import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
      index: true,
    },

    action: {
      type: String,
      enum: [
        "LOGIN",
        "LOGOUT",
        "CREATE",
        "UPDATE",
        "DELETE",
        "APPROVE",
        "CANCEL",
        "PAYMENT",
        "STOCK_IN",
        "STOCK_OUT",
      ],
      required: true,
      index: true,
    },

    module: {
      type: String,
      enum: [
        "AUTH",
        "ORDER",
        "PAYMENT",
        "INVENTORY",
        "PURCHASE",
        "SUPPLIER",
        "MENU",
        "CATEGORY",
        "TABLE",
        "KOT",
        "STAFF",
        "QR_MENU",
        "NOTIFICATION",
        "SYSTEM",
      ],
      required: true,
      index: true,
    },

    recordId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    oldData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    newData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    ipAddress: {
      type: String,
      trim: true,
      default: null,
    },

    userAgent: {
      type: String,
      trim: true,
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

auditLogSchema.index({
  tenantId: 1,
  userId: 1,
  createdAt: -1,
});

auditLogSchema.index({
  tenantId: 1,
  module: 1,
  createdAt: -1,
});

auditLogSchema.index({
  tenantId: 1,
  action: 1,
  createdAt: -1,
});

auditLogSchema.index({
  tenantId: 1,
  recordId: 1,
  createdAt: -1,
});

const AuditLog =
  mongoose.models.AuditLog ||
  mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;