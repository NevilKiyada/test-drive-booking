// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const userRoutes = require("./routes/userRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");

// dotenv.config();

// const app = express();

// // Middleware

// app.use(cookieParser()); // Enable cookie parsing
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Middleware to authenticate users based on cookies
// function authenticateUser(req, res, next) {
//   const { userId, role } = req.cookies;

//   if (!userId) {
//     return res.status(401).json({ message: "Not authenticated" });
//   }

//   req.user = { userId, role }; // Add user info to request object
//   next();
// }

// // Example admin-only route
// app.get("/admin/dashboard", authenticateUser, (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied: Admins only" });
//   }

//   res.status(200).json({ message: "Welcome to the admin dashboard!" });
// });

// // Routes
// app.use("/api/users", userRoutes); // User-related routes
// app.use("/api/bookings", bookingRoutes); // Booking-related routes

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// // Import Routes
// const userRoutes = require("./routes/userRoutes");
// const bookingRoutes = require("./routes/bookingRoutes");
// const carRoutes = require("./routes/carRoutes"); // New Car Routes
// const showroomRoutes = require("./routes/showroomRoutes"); // New Showroom Routes

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173", // Adjust this if needed for frontend
//   credentials: true // Allow cookies & authentication headers
// }));

// app.use(cookieParser()); 
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // Middleware to authenticate users based on cookies
// function authenticateUser(req, res, next) {
//   const { userId, role } = req.cookies;

//   if (!userId) {
//     return res.status(401).json({ message: "Not authenticated" });
//   }

//   req.user = { userId, role }; 
//   next();
// }

// // Example admin-only route
// app.get("/admin/dashboard", authenticateUser, (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied: Admins only" });
//   }

//   res.status(200).json({ message: "Welcome to the admin dashboard!" });
// });

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/cars", carRoutes); // ✅ New Car Routes
// app.use("/api/showrooms", showroomRoutes); // ✅ New Showroom Routes

// // Logout Route
// app.post("/api/users/logout", (req, res) => {
//   res.clearCookie("token"); 
//   res.status(200).json({ message: "Logged out successfully" });
// });

// // Start server 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");



// Import Routes
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const carRoutes = require("./routes/carRoutes"); 
const showroomRoutes = require("./routes/showroomRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/showrooms", showroomRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
