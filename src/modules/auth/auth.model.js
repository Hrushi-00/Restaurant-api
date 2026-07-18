import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

   email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
},

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Authentication
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    // Role & Access
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "OWNER", "MANAGER", "CHEF", "CASHIER", "WAITER"],
      default: "OWNER",
    },

    // Multi Tenant
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      default: null,
    },

    // Verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
      select: false,
    },

    otpExpiry: {
      type: Date,
      default: null,
      select: false,
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes

authSchema.index({ tenantId: 1 });

const Auth = mongoose.model("Auth", authSchema);

export default Auth;