// const express = require("express");
// const Booking = require("../models/Booking");
// const User = require("../models/User"); // Make sure you import the User model

// const router = express.Router();

// // Create a new booking
// router.post("/book", async (req, res) => {
//   const { carModel, date, userId } = req.body;

//   // Check if the user exists
//   try {
//     const user = await User.findById(userId); // Find user by ID
//     if (!user) {
//       return res.status(404).json({ message: "User not found" }); // Return error if user not found
//     }

//     // Proceed to create the booking if user is found
//     const newBooking = await Booking.create({
//       carModel,
//       date,
//       user: userId, // Associate the booking with the user
//     });

//     res.status(201).json(newBooking); // Return the newly created booking
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ message: "Error creating booking", error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Car = require("../models/Car");
const Showroom = require("../models/Showroom");

const router = express.Router();

// Create a new booking
router.post("/book", async (req, res) => {
  const { carId, userId, showroomId, date } = req.body;

  try {
    // Validate request data
    if (!carId || !userId || !showroomId || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Ensure the car is available for test drives
    if (!car.testDriveAvailability) {
      return res.status(400).json({ message: "Test drive is unavailable for this car" });
    }

    // Check if showroom exists
    const showroom = await Showroom.findById(showroomId);
    if (!showroom) return res.status(404).json({ message: "Showroom not found" });

    // Prevent duplicate bookings on the same date
    const existingBooking = await Booking.findOne({ car: carId, user: userId, date });
    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this car on this date" });
    }

    // Create booking
    const newBooking = new Booking({
      car: carId,
      user: userId,
      showroom: showroomId,
      date,
    });

    await newBooking.save();

    // Update car's booking list
    car.bookings.push(newBooking._id);
    await car.save();

    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
});

// Get all bookings
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .populate("car", "model brand price")
      .populate("showroom", "name location");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Get bookings by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("car", "model brand price")
      .populate("showroom", "name location");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
});

// Get bookings by showroom ID
router.get("/showroom/:showroomId", async (req, res) => {
  try {
    const bookings = await Booking.find({ showroom: req.params.showroomId })
      .populate("user", "name email phone")
      .populate("car", "model brand price");

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching showroom bookings:", err);
    res.status(500).json({ message: "Failed to fetch showroom bookings" });
  }
});

// Cancel a booking
router.delete("/cancel/:bookingId", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Remove booking from the car's booking list
    await Car.findByIdAndUpdate(booking.car, { $pull: { bookings: booking._id } });

    // Delete booking
    await Booking.findByIdAndDelete(req.params.bookingId);

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error("Error canceling booking:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

module.exports = router;
