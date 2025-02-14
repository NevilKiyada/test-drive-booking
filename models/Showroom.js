// const mongoose = require("mongoose");

// const showroomSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   owner: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Showroom", showroomSchema);


// const mongoose = require("mongoose");

// const showroomSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   owner: { type: String, required: true },
//   image: { type: String, default: "" }, // Remove the placeholder default
//   createdAt: { type: Date, default: Date.now }
// });

// // Middleware to ensure the default image is only set when missing
// showroomSchema.pre("save", function (next) {
//   if (!this.image) {
//     this.image = "https://via.placeholder.com/300"; // Set default only if missing
//   }
//   next();
// });

// module.exports = mongoose.model("Showroom", showroomSchema);



// const mongoose = require("mongoose");

// const showroomSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   owner: { type: String, required: true },
//   image: { type: String, required: true }, // ✅ No default image here
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Showroom", showroomSchema);




const mongoose = require("mongoose");

const showroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin who owns showroom
    image: { type: String, required: true }, // Showroom image
    createdAt: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model("Showroom", showroomSchema);
