// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     showroom: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom", required: true }, // Showroom where booking is made
//     car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, // Specific car booked
//     date: { type: Date, required: true },
//     status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);




// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     showroom: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom", required: true }, // Showroom where booking is made
//     car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, // Specific car booked
//     date: { type: Date, required: true },
//     status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    showroom: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // Added timeSlot
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
