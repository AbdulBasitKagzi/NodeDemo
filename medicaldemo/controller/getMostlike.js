const Producttype = require("../model/productType");

async function getMostlike(req, res) {
  try {
    const likeProducts = await Producttype.find().sort({ like: -1 });
    return await res.status(200).json(likeProducts);
  } catch (error) {
    return await res
      .status(400)
      .json({ error: "Can't get the most like product 😒" });
  }
}

module.exports = getMostlike;
