const mongoose = require("mongoose");
const BusinessSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    userName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    address: {
      type: String,
    },
    order: {
      type: String,
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
