const mongoose = require("mongoose");

const producttype = mongoose.Schema({
  type: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Producttype = mongoose.model("producttype", producttype);
module.exports = Producttype;
