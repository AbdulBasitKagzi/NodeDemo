const Product = require("../model/products");
const express = require("express");

const fetchUsers = require("../middleware/fetch");
const Producttype = require("../model/productType");
// const routes = require("../route/routes");

// const routes = express.Router();

// routes.post("/enterproduct", fetchUsers, async (req, res) => {
//   const addProduct = await Product({ ...req.body, owner: req.user._id });

//   try {
//     await addProduct.save();
//     return res.status(200).send(addProduct);
//   } catch (error) {
//     console.log(error);
//   }
// });

async function eneterProduct(req, res) {
  const { productname, type } = req.body;
  try {
    const addProduct = await Product.create({
      productname,
      type,
      owner: user._id,
    });
    return await res.status(200).json(addProduct);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "This product name is already there" });
  }
}

module.exports = eneterProduct;
