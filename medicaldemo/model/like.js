const mongoose = require("mongoose");

// creating schema
const likeSchema = mongoose.Schema({
  like_dislike: {
    type: Boolean,
    default: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },    
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
