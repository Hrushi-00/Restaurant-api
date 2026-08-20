import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    description: {
      type: String,
      trim: true,
    },

    discountType: {
      type: String,
      enum: ["FLAT", "PERCENTAGE", "BOGO", "FESTIVAL"],
      required: true,
    },

    discountValue: {
      type: Number,
      default: 0,
      min: 0,
    },

    buyQuantity: {
      type: Number,
      default: null,
      min: 1,
    },

    getQuantity: {
      type: Number,
      default: null,
      min: 1,
    },

    minimumOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    maximumDiscountAmount: {
      type: Number,
      default: null,
      min: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    usageLimit: {
      type: Number,
      default: null,
      min: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.index(
  { tenantId: 1, code: 1 },
  { unique: true }
);

couponSchema.index({
  tenantId: 1,
  isActive: 1,
  startDate: 1,
  endDate: 1,
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;