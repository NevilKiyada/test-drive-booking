const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  carModel: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Booking", bookingSchema);
