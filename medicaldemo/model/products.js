const mongoose = require("mongoose");

const product = mongoose.Schema({
  productname: {
    type: String,
    lowerCase: true,
    unique: [true, "This product is already there"],
  },
  type: {
    type: mongoose.Schema.Types.String,
    ref: "producttype",
  },
  expire: {
    type: Date,
    default:
      Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10,
    // Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10,
  },
  pID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  comment: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
// product.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject._id;
//   //   delete userObject.tokens;
//   //   delete userObject.createdAt;
//   //   delete userObject.updatedAt;
//   return userObject;
// };
const Product = mongoose.model("product", product);
module.exports = Product;
