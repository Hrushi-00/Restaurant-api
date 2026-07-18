import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: [
        "MANAGER",
        "CHEF",
        "WAITER",
        "CASHIER",
        "KITCHEN_STAFF",
      ],
      required: true,
    },

    salary: {
      type: Number,
      default: 0,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    shift: {
      type: String,
      enum: ["MORNING", "EVENING", "FULL_DAY"],
      default: "FULL_DAY",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
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

staffSchema.index({ email: 1 });
staffSchema.index({ phone: 1 });

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;