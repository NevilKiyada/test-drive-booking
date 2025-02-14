// const express = require("express");
// const Car = require("../models/Car");
// const Showroom = require("../models/Showroom");

// const router = express.Router();

// //add new car
// router.post("/add", async (req, res) => {
//     const { showroom, model, brand, year, price, availability, imageUrl } = req.body;
  
//     // Check if all required fields are provided
//     if (!showroom || !model || !brand || !year || !price) {
//       return res.status(400).json({ message: "All fields (showroom, model, brand, year, price) are required" });
//     }
  
//     try {
//       const newCar = new Car({ showroom, model, brand, year, price, availability, imageUrl });
//       await newCar.save();
//       res.status(201).json({ message: "Car added successfully", car: newCar });
//     } catch (error) {
//       res.status(500).json({ message: "Failed to add car", error: error.message });
//     }
//   });


// // Get all cars
// router.get("/all", async (req, res) => {
//   try {
//     const cars = await Car.find().populate("showroom", "name location");
//     res.status(200).json(cars);
//   } catch (err) {
//     console.error("Error fetching cars:", err);
//     res.status(500).json({ message: "Failed to fetch cars" });
//   }
// });

// // Get cars by showroom ID
// router.get("/showroom/:showroomId", async (req, res) => {
//   try {
//     const cars = await Car.find({ showroom: req.params.showroomId }).populate("showroom", "name location");
//     res.status(200).json(cars);
//   } catch (err) {
//     console.error("Error fetching cars by showroom:", err);
//     res.status(500).json({ message: "Failed to fetch cars" });
//   }
// });

// // Get car by ID
// router.get("/:carId", async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.carId).populate("showroom", "name location");
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }
//     res.status(200).json(car);
//   } catch (err) {
//     console.error("Error fetching car:", err);
//     res.status(500).json({ message: "Failed to fetch car" });
//   }
// });

// // Update car details
// router.put("/update/:carId", async (req, res) => {
//   try {
//     const { model, brand, price, showroomId } = req.body;

//     // Find the car and update details
//     const updatedCar = await Car.findByIdAndUpdate(
//       req.params.carId,
//       { model, brand, price, showroom: showroomId },
//       { new: true }
//     );

//     if (!updatedCar) {
//       return res.status(404).json({ message: "Car not found" });
//     }

//     res.status(200).json({ message: "Car updated successfully", car: updatedCar });
//   } catch (err) {
//     console.error("Error updating car:", err);
//     res.status(500).json({ message: "Failed to update car" });
//   }
// });

// // Delete car
// router.delete("/delete/:carId", async (req, res) => {
//   try {
//     const deletedCar = await Car.findByIdAndDelete(req.params.carId);
//     if (!deletedCar) {
//       return res.status(404).json({ message: "Car not found" });
//     }
//     res.status(200).json({ message: "Car deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting car:", err);
//     res.status(500).json({ message: "Failed to delete car" });
//   }
// });

// module.exports = router;




const express = require("express");
const Car = require("../models/Car");
const Showroom = require("../models/Showroom");

const router = express.Router();

// Add new car
router.post("/add", async (req, res) => {
  const {
    showroom,
    model,
    brand,
    year,
    price,
    availability,
    imageUrl,
    description,
    transmission,
    fuelType,
    engine,
    power,
  } = req.body;

  // Validate required fields
  if (!showroom || !model || !brand || !year || !price) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const newCar = new Car({
      showroom,
      model,
      brand,
      year,
      price,
      availability,
      imageUrl,
      description,
      transmission,
      fuelType,
      engine,
      power,
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: "Failed to add car", error: error.message });
  }
});

// Get all cars
router.get("/all", async (req, res) => {
  try {
    const cars = await Car.find().populate("showroom", "name location");
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// Get cars by showroom ID
router.get("/showroom/:showroomId", async (req, res) => {
  try {
    const cars = await Car.find({ showroom: req.params.showroomId }).populate("showroom", "name location");
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars by showroom:", err);
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// Get car by ID
router.get("/:carId", async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId).populate("showroom", "name location");
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    console.error("Error fetching car:", err);
    res.status(500).json({ message: "Failed to fetch car" });
  }
});

// Update car details
router.put("/update/:carId", async (req, res) => {
  try {
    const {
      model,
      brand,
      year,
      price,
      availability,
      imageUrl,
      description,
      transmission,
      fuelType,
      engine,
      power,
      showroom,
    } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.carId,
      {
        model,
        brand,
        year,
        price,
        availability,
        imageUrl,
        description,
        transmission,
        fuelType,
        engine,
        power,
        showroom,
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car updated successfully", car: updatedCar });
  } catch (err) {
    console.error("Error updating car:", err);
    res.status(500).json({ message: "Failed to update car" });
  }
});

// Delete car
router.delete("/delete/:carId", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.carId);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ message: "Failed to delete car" });
  }
});

module.exports = router;
