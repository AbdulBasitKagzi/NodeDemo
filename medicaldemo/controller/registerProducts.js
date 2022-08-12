const Producttype = require("../model/productType");

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

// get all product types
async function getallproducttype(req, res) {
  try {
    const products = await Producttype.find();
    return await res.status(200).json(products);
  } catch (error) {
    console.log("findingerror", error);
    return await res.status(200).json({ error: "Can't get the products 😒" });
  }
}

module.exports = { registerProduct, getallproducttype };
