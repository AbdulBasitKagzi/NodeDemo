const Product = require("../model/products");
const Producttype = require("../model/productType");
const Like = require("../model/like");
var ObjectId = require("mongodb").ObjectID;

async function getlike(req, res) {
  const id = req.params.id;
  const { like_dislike, productId } = req.body;
  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    const like = await Like.findOne({ productId: id, owner: user._id });
    if (like) {
      const liketype = like.like_dislike ? false : true;
      await Like.updateOne(
        { productId: id, owner: user._id },
        { like_dislike: liketype }
      );
      return res.status(200).send(liketype ? "Like" : "Disliked");
    }

    //   const addlike = new Like({ productId: _id, owner: user._id });
    //   await addlike.create({
    //     like_dislike: req.params.body,
    //     productId: req.params.body,
    //     owner: user_.id,
    //   });
    //   res.status(201).send("Liked ! ");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  const like = await Like.create({
    like_dislike,
    productId,
    owner: user._id,
  });
  return res.status(200).json(like);
}

async function getMostlike(req, res) {
  const id = req.params.id;
  const products = await Like.find({
    _id: id,
    like_dislike: true,
  }).count();
  // console.log("p", products);

  // const likevalue = products.map((p) => p.like_dislike);

  // console.log("key", likevalue);
  // let sum = 0;
  // let count = likevalue.reduce((acc) => {
  //   return (sum += acc);
  // }, 1);
  // console.log("sdfsd", count);
  return res.status(200).json(products);
}
module.exports = { getlike, getMostlike };
