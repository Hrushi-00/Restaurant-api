import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
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

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    reservationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    guestName: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
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

    reservationDate: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
      trim: true,
    },

    guestCount: {
      type: Number,
      required: true,
      min: 1,
    },

    specialRequest: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "SEATED",
        "COMPLETED",
        "CANCELLED",
        "NO_SHOW",
      ],
      default: "PENDING",
    },

    checkedInAt: {
      type: Date,
      default: null,
    },

    checkedOutAt: {
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

reservationSchema.index({
  tenantId: 1,
  reservationNumber: 1,
});

reservationSchema.index({
  tenantId: 1,
  reservationDate: 1,
  timeSlot: 1,
});

reservationSchema.index({
  tenantId: 1,
  tableId: 1,
  reservationDate: 1,
});

export default mongoose.model(
  "Reservation",
  reservationSchema
);