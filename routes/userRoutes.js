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


const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Middleware to check admin access
function isAdmin(req, res, next) {
  const { role } = req.body || {}; // Role comes from request body
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
}

// Register a new user (Admin or Regular User)
router.post("/register", async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user
    const newUser = new User({ name, email, phone, password, role: role || "user" });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// User Login (No JWT, uses plain text password)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check plain text password
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all users (Admin Only)
router.get("/all-users", isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Fetch a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Logout (Just a response, since no JWT is used)
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
