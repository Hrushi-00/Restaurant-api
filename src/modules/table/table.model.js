import mongoose from "mongoose";

export const TABLE_STATUS = {
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  OCCUPIED: "OCCUPIED",
  CLEANING: "CLEANING",
  OUT_OF_SERVICE: "OUT_OF_SERVICE",
};

const tableSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    tableNumber: {
      type: String,
      required: true,
      trim: true,
    },

    tableName: {
      type: String,
      trim: true,
      default: "",
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    section: {
      type: String,
      trim: true,
      default: "Main Hall",
    },

    status: {
      type: String,
      enum: Object.values(TABLE_STATUS),
      default: TABLE_STATUS.AVAILABLE,
    },

    qrCode: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
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

// Prevent duplicate table numbers within the same restaurant
tableSchema.index(
  { tenantId: 1, tableNumber: 1 },
  { unique: true }
);

export default mongoose.model("Table", tableSchema);