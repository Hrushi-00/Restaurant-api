import mongoose from "mongoose";

const qrMenuSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    qrCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    qrUrl: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },

    scanCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastScannedAt: {
      type: Date,
      default: null,
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

qrMenuSchema.index({ tenantId: 1, tableId: 1 }, { unique: true });
qrMenuSchema.index({ tenantId: 1, qrCode: 1 });

export default mongoose.model("QrMenu", qrMenuSchema);