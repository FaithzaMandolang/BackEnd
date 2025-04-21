const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    status: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
