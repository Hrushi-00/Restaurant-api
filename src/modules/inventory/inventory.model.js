import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    itemCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
    },

    unit: {
      type: String,
      enum: [
        "PIECE",
        "KG",
        "GRAM",
        "LITRE",
        "ML",
        "PACK",
        "BOX",
        "BOTTLE",
      ],
      default: "PIECE",
    },

    openingStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    maximumStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    purchasePrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    sellingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    lastStockInAt: {
      type: Date,
      default: null,
    },

    lastStockOutAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
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

inventorySchema.index(
  {
    tenantId: 1,
    itemCode: 1,
  },
  {
    unique: true,
  }
);

inventorySchema.index({
  tenantId: 1,
  itemName: 1,
});

inventorySchema.virtual("isLowStock").get(function () {
  return this.currentStock <= this.minimumStock;
});

inventorySchema.set("toJSON", {
  virtuals: true,
});

inventorySchema.set("toObject", {
  virtuals: true,
});

const Inventory =
  mongoose.models.Inventory ||
  mongoose.model("Inventory", inventorySchema);

export default Inventory;