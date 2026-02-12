const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  senderName: String,
  receiverName: String,
  origin: String,
  destination: String,
  status: {
    type: String,
    enum: [
      "Processing",
      "In Transit",
      "Arrived at Hub",
      "Out for Delivery",
      "Delivered"
    ],
    default: "Processing",
  },
  currentLocation: String,
  estimatedDelivery: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Shipment", ShipmentSchema);
