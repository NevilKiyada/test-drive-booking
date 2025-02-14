// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true, index: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//     role: { type: String, enum: ["user", "admin"], default: "user" }, // Only 'user' or 'admin'
//     showroom: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom", default: null }, // Admin can own a showroom
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Only 'user' or 'admin'
    showroom: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom", default: null }, // Admin can own a showroom
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
