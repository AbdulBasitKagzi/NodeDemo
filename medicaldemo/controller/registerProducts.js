const Producttype = require("../model/product");

// function to register product
async function registerProduct(req, res) {
  const { type, createdAt } = req.body;
  // const productname = req.body;
  // console.log("user", user);
  const product = await Producttype.findOne({ type: req.body.type });
  if (product) {
    return await res.status(400).send("Product is already registered");
  }
  try {
    const producttype = await Producttype.create({
      type,
      createdAt,
      // productname: req.body.productname,
      // comment,
      // like,
      // owner: user._id,
    });
    return await res.status(200).json(producttype);
  } catch (error) {
    console.log("error", error);
    return await res.status(400).json({ error: "Product not registered" });
  }
}

module.exports = registerProduct;
