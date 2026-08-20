import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
      index: true,
    },

    movementType: {
      type: String,
      enum: [
        "PURCHASE_IN",
        "SALE_OUT",
        "MANUAL_IN",
        "MANUAL_OUT",
        "ADJUSTMENT",
        "RETURN_IN",
        "RETURN_OUT",
        "WASTAGE",
      ],
      required: true,
      index: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },

    previousStock: {
      type: Number,
      required: true,
      min: 0,
    },

    newStock: {
      type: Number,
      required: true,
      min: 0,
    },

    referenceType: {
      type: String,
      enum: [
        "PURCHASE",
        "ORDER",
        "KOT",
        "MANUAL",
        "ADJUSTMENT",
        "RETURN",
      ],
      default: "MANUAL",
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    reason: {
      type: String,
      trim: true,
      default: "",
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

stockMovementSchema.index({
  tenantId: 1,
  inventoryId: 1,
  createdAt: -1,
});

stockMovementSchema.index({
  tenantId: 1,
  movementType: 1,
  createdAt: -1,
});

stockMovementSchema.index({
  tenantId: 1,
  referenceType: 1,
  referenceId: 1,
});

const StockMovement =
  mongoose.models.StockMovement ||
  mongoose.model(
    "StockMovement",
    stockMovementSchema
  );

export default StockMovement;