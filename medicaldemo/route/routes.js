// imports
const express = require("express");
const Producttype = require("../model/product");

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controller/registeruser");
const registerProduct = require("../controller/registerProducts");
const fetchUsers = require("../middleware/fetch");
const getRecentProds = require("../controller/getRecent");
const getMostlike = require("../controller/getMostlike");

// setting up router
const routes = express.Router();

// setting up request
routes.get("/", (req, res) => {
  res.send(`Server is there :) 😊`);
});

// get request for products
routes.get("/getproducts/:type", async (req, res) => {
  // const type = req.params.type;
  // console.log("type", type);
  try {
    const products = await Producttype.find({ type: req.params.type });
    return await res.status(200).json(products);
  } catch (error) {
    console.log("findingerror", error);
    return await res.status(200).json({ error: "Can't get the products 😒" });
  }
});
routes.post("/signup", registerUser);
routes.post("/login", loginUser);
routes.post("/getUser", fetchUsers, getUsers);
routes.post("/registerproduct", fetchUsers, registerProduct);

// update request for product
routes.patch("/updatecomment/:id", fetchUsers, async (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  const { productname } = req.body;
  const { like } = req.body;
  console.log("req", req.body);

  const prodarray = await Producttype.findById(id, {
    _id: 0,
    comment: 0,
    __v: 0,
    type: 0,
    like: 0,
  });
  let valid = true;
  console.log("product", productname);
  prodarray.productname.forEach((element) => {
    console.log("ele", element);
    if (element == productname) {
      valid = false;
    }
  });

  try {
    if (valid) {
      const newprod = await Producttype.findByIdAndUpdate(
        id,

        {
          comment,
          like,
          $push: {
            productname,
          },
        },

        { new: true }
      );
      return await res.status(200).json(newprod);
    } else {
      return await res.status(400).json({ message: "Product already exist" });
    }
  } catch (error) {
    console.log("updateerror", error);
    return await res.status(400).json({ error: "Update failed" });
  }
});

// delete any product
routes.delete("/deleteproduct/:type", fetchUsers, async (req, res) => {
  const type = req.params.type;
  console.log("type", type);
  try {
    const products = await Producttype.deleteOne({ type: req.params.type });
    return await res.status(200).json(products);
  } catch (error) {
    console.log("deleterror", error);
    return await res.status(400).json({ error: "Can't delete 😒" });
  }
});

// practicing populate()
routes.get("/getall", fetchUsers, async (req, res) => {
  //const id = req.params.id;
  //console.log("id", id);
  console.log("hello", user);
  const poducts = await Producttype.find({ owner: user._id }).populate("owner");
  return res.status(200).json(poducts);
});

// get recent products
routes.get("/recent", getRecentProds);

// get mostliked product
routes.get("/mostlike", getMostlike);

// get medical product by product types
routes.get("/medicalproduct", async (req, res) => {
  try {
    const medproducts = await Producttype.find(
      { type: "Medical" },
      { productname: 1 }
    );
    return res.status(200).json(medproducts);
  } catch (error) {
    return res.status(400).json({ error: "Can't get the data 😓" });
  }
});
// exporting routes
module.exports = routes;
