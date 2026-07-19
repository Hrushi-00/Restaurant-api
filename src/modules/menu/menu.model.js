import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    sku: {
      type: String,
      unique: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    preparationTime: {
      type: Number,
      default: 10,
    },

    foodType: {
      type: String,
      enum: ["VEG", "NON_VEG", "EGG"],
      default: "VEG",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    taxPercentage: {
      type: Number,
      default: 5,
    },

    displayOrder: {
      type: Number,
      default: 0,
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

menuSchema.index(
  {
    tenantId: 1,
    categoryId: 1,
  }
);

menuSchema.index(
  {
    tenantId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;