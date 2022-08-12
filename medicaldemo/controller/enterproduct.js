const Product = require("../model/products");
const Producttype = require("../model/productType");
var ObjectId = require("mongodb").ObjectID;
// const express = require("express");
// const { route } = require("../route/routes");
// const fetchUsers = require("../middleware/fetch");
// const Producttype = require("../model/productType");
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

// to enter product by product type
async function enterProduct(req, res) {
  const { productname, type, pID, expire } = req.body;
  try {
    const addProduct = await Product.create({
      pID,
      productname,
      type,
      expire,
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

// to get only medical product
async function getmedicalproduct(req, res) {
  try {
    const medproducts = await Product.find(
      { id: ObjectId, type: "Medical" },
      { productname: 1, type: 1 }
    );
    return res.status(200).json(medproducts);
  } catch (error) {
    console.log("getdta", error);
    return res.status(400).json({ error: "Can't get the data 😓" });
  }
}

// get medical product by type
async function getmedicalproductbytype(req, res) {
  try {
    const medproducts = await Product.find(
      { type },
      { productname: 1, type: 1 }
    );
    return res.status(200).json(medproducts);
  } catch (error) {
    console.log("getdta", error);
    return res.status(400).json({ error: "Can't get the data 😓" });
  }
}

// edit medical product
async function editmedicalproduct(req, res) {
  const id = req.params.id;
  const { productname } = req.body;
  const findowner = await Product.findOne({ _id: id }, { _id: 0, owner: 1 });
  // console.log("owner", JSON.stringify(findowner));
  // console.log("user", JSON.stringify(user._id));
  if (JSON.stringify(findowner.owner) === JSON.stringify(user._id)) {
    const newprod = await Product.findByIdAndUpdate(
      { _id: id },
      {
        productname,
      },
      { new: true }
    );
    return res.status(200).json(newprod);
  } else {
    console.log("Your are not eligible to edit");
    return res.status(400).send("You are not eligible to edit 🤣");
  }
}

// comment on the product
async function addcomment(req, res) {
  const id = req.params.id;
  const { comment } = req.body;
  const findowner = await Product.findOne({ _id: id }, { _id: 0, owner: 1 });
  // console.log("owner", JSON.stringify(findowner));
  // console.log("user", JSON.stringify(user._id));
  if (JSON.stringify(findowner.owner) === JSON.stringify(user._id)) {
    const newprod = await Product.findByIdAndUpdate(
      { _id: id },
      {
        comment,
      },
      { new: true }
    );
    return res.status(200).json(newprod);
  } else {
    console.log("Your are not eligible to edit");
    return res.status(400).send("You are not eligible to comment 🤣");
  }
}

// deleting the product
async function deletemedicalproduct(req, res) {
  const id = req.params.id;

  const findowner = await Product.findOne(
    { _id: id },
    { _id: 0, owner: 1, type: 1 }
  );
  console.log("owner", JSON.stringify(findowner.type));
  // console.log("user", JSON.stringify(user._id));
  if (JSON.stringify(findowner.owner) === JSON.stringify(user._id)) {
    if (findowner.type === "Medical") {
      console.log("Eligible to delete");
      const newprod = await Product.deleteOne({ _id: id });
      return res.status(200).json(newprod);
    } else {
      console.log("You can't delete this product");
      return res.status(200).send("This product can't be deleted 🙍‍♂️");
    }
  } else {
    console.log("Your are not eligible to edit");
    return res.status(400).send("You are not eligible to delete 🤣");
  }
}

// to get recent products
async function getRecentProds(req, res) {
  try {
    const recentProds = await Product.find({}).sort({ _id: -1 });
    console.log("recent", recentProds);
    return await res.status(201).json(recentProds);
  } catch (error) {
    return await res
      .status(400)
      .json({ error: "Can't get the most recent product 😒" });
  }
}

module.exports = getRecentProds;

// exporting
module.exports = {
  enterProduct,
  getmedicalproduct,
  getmedicalproductbytype,
  editmedicalproduct,
  addcomment,
  deletemedicalproduct,
  getRecentProds,
};
