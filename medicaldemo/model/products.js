const mongoose = require("mongoose");

const product = mongoose.Schema({
  productname: {
    type: String,
    lowerCase: true,
    unique: [true, "This product is already there"],
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "producttype",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
const Product = mongoose.model("product", product);
module.exports = Product;
