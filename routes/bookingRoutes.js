const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User"); // Make sure you import the User model

const router = express.Router();

// Create a new booking
router.post("/book", async (req, res) => {
  const { carModel, date, userId } = req.body;

  // Check if the user exists
  try {
    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return error if user not found
    }

    // Proceed to create the booking if user is found
    const newBooking = await Booking.create({
      carModel,
      date,
      user: userId, // Associate the booking with the user
    });

    res.status(201).json(newBooking); // Return the newly created booking
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Error creating booking", error: err.message });
  }
});

module.exports = router;
