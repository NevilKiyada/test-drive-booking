const express = require("express");
const Showroom = require("../models/Showroom");
const Car = require("../models/Car");

const router = express.Router();

// Add a new showroom
// router.post("/add", async (req, res) => {
//     const { name, location, email, phone, address, owner } = req.body;
  
//     // Check if all required fields are provided
//     if (!name || !location || !email || !phone || !address || !owner) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
  
//     try {
//       const newShowroom = new Showroom({ name, location, email, phone, address, owner });
//       await newShowroom.save();
//       res.status(201).json({ message: "Showroom added successfully", showroom: newShowroom });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to add showroom", error: error.message });
//     }
//   });
  

router.post("/add", async (req, res) => {
  const { name, location, email, phone, address, owner, image } = req.body;

  if (!name || !location || !email || !phone || !address || !owner || !image) {
    return res.status(400).json({ message: "All fields including image are required" });
  }

  try {
    const newShowroom = new Showroom({
      name, location, email, phone, address, owner, image
    });

    await newShowroom.save();
    res.status(201).json({ message: "Showroom added successfully", showroom: newShowroom });
  } catch (error) {
    res.status(500).json({ message: "Failed to add showroom", error: error.message });
  }
});


// Get all showrooms
router.get("/all", async (req, res) => {
  try {
    const showrooms = await Showroom.find();
    res.status(200).json(showrooms);
  } catch (err) {
    console.error("Error fetching showrooms:", err);
    res.status(500).json({ message: "Failed to fetch showrooms" });
  }
});

// Get showroom by ID
router.get("/:showroomId", async (req, res) => {
  try {
    const showroom = await Showroom.findById(req.params.showroomId);
    if (!showroom) {
      return res.status(404).json({ message: "Showroom not found" });
    }
    res.status(200).json(showroom);
  } catch (err) {
    console.error("Error fetching showroom:", err);
    res.status(500).json({ message: "Failed to fetch showroom" });
  }
});

// Get all cars in a showroom
router.get("/:showroomId/cars", async (req, res) => {
  try {
    const cars = await Car.find({ showroom: req.params.showroomId });
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars in showroom:", err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// Update showroom details
router.put("/update/:showroomId", async (req, res) => {
  try {
    const { name, location, email, phone, address, image } = req.body;

    const updatedShowroom = await Showroom.findByIdAndUpdate(
      req.params.showroomId,
      { name, location, email, phone, address, image },
      { new: true } // Return updated document
    );

    if (!updatedShowroom) {
      return res.status(404).json({ message: "Showroom not found" });
    }

    res.status(200).json({ message: "Showroom updated successfully", showroom: updatedShowroom });
  } catch (err) {
    console.error("Error updating showroom:", err);
    res.status(500).json({ message: "Failed to update showroom" });
  }
});




// Delete showroom

router.delete("/delete/:showroomId", async (req, res) => {
  try {
    const deletedShowroom = await Showroom.findByIdAndDelete(req.params.showroomId);
    if (!deletedShowroom) {
      return res.status(404).json({ message: "Showroom not found" });
    }
    res.status(200).json({ message: "Showroom deleted successfully" });
  } catch (err) {
    console.error("Error deleting showroom:", err);
    res.status(500).json({ message: "Failed to delete showroom" });
  }
});

module.exports = router;
