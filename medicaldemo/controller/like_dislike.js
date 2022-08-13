const Product = require("../model/products");
const Producttype = require("../model/productType");
const Like = require("../model/like");
var ObjectId = require("mongodb").ObjectID;

async function getlike(req, res) {
  const id = req.params.id;
  const { like_dislike } = req.body;
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
    const addlike = new Like({ productId: id, owner: user._id });
    await addlike.save();
    // const addlike = await Like.create({
    //   like_dislike,
    //   productId,
    //   owner: user._id,
    // });
    return res.status(200).send("Liked");

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
}

async function getMostlike(req, res) {
  try {
    const product = await Product.aggregate([
      {
        $lookup: {
          from: "likes",
          as: "result",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$id", "$productId"] },
                like_dislike: true,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          totalLikes: {
            $size: "$result",
          },
        },
      },
      {
        $sort: {
          totalLikes: -1,
        },
      },
      { $limit: 10 },
    ]);
    res.send(product);
  } catch (error) {
    res.send(error.toString());
  }
}

module.exports = { getlike, getMostlike };
