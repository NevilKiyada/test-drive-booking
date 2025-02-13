// const express = require("express");
// const User = require("../models/User");

// const router = express.Router();

// // Create a new user (Registration)
// router.post("/register", async (req, res) => {
//   const { name, email, phone, password, role } = req.body;

//   // Validate input fields
//   if (!name || !email || !phone || !password) {
//     return res.status(400).json({ error: "Please provide all required fields" });
//   }

//   try {
//     // Check if the user already exists by email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already in use" });
//     }

//     // Create a new user, allowing 'role' to be passed
//     const newUser = new User({ name, email, phone, password, role: role || "user" });
//     await newUser.save();

//     // Return success response
//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (err) {
//     console.error("Error during user registration:", err);
//     res.status(500).json({ error: "Failed to register user", details: err.message });
//   }
// });


// // General User Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     res.status(200).json({ message: "Login successful", user });
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Admin Login
// router.post("/admin/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Not an admin." });
//     }

//     res.status(200).json({ message: "Admin login successful", user });
//   } catch (err) {
//     console.error("Error during admin login:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Fetch all users (Admin only)
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });

// // Fetch a specific user by ID
// router.get("/:id", async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     res.status(500).json({ error: "Failed to fetch user" });
//   }
// });

// module.exports = router;



const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const router = express.Router();

// Middleware to protect admin-only routes
function isAdmin(req, res, next) {
  const { role } = req.user || {};
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
}

// Register a new user (Admin or Regular User)
router.post("/register", async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // Validate input fields
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  try {
    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create a new user
    const newUser = new User({ name, email, phone, password, role: role || "user" });
    await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
});

// Login for users (Admin or Regular User)
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     res.cookie("userId", user._id.toString(), { httpOnly: true, secure: false, maxAge: 86400000 });
//     res.cookie("role", user.role, { httpOnly: true, secure: false, maxAge: 86400000 });

//     res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, role: user.role } });
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("🔍 Incoming Login Request:", { email, password });

  try {
      const user = await User.findOne({ email });
      console.log("🛠 Found User:", user);

      if (!user) {
          return res.status(401).json({ message: "User not found" });
      }

      // Since passwords are stored in plain text, do a direct comparison
      if (user.password !== password) {
          console.log("❌ Password does not match");
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token and respond
      res.json({
          message: "Login successful",
          user: { id: user._id, email: user.email, role: user.role },
      });

  } catch (error) {
      console.error("⚠️ Login Error:", error);
      res.status(500).json({ message: "Server error" });
  }
});


// Fetch all users (Admin only)
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Fetch a specific user by ID (Admin or Regular User)
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
