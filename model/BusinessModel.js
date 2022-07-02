const mongoose = require("mongoose");
const BusinessSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    order: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 12,
    },
    status: {
      type: String,
      default: "Business",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", BusinessSchema);
