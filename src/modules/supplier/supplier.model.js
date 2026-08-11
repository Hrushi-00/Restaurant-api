import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    supplierCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    supplierName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    alternatePhone: {
      type: String,
      trim: true,
      default: null,
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    pincode: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "INACTIVE",
      ],
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

supplierSchema.index(
  {
    tenantId: 1,
    supplierCode: 1,
  },
  {
    unique: true,
  }
);

supplierSchema.index({
  tenantId: 1,
  supplierName: 1,
});

const Supplier =
  mongoose.models.Supplier ||
  mongoose.model(
    "Supplier",
    supplierSchema
  );

export default Supplier;