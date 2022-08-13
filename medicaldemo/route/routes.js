// imports
const express = require("express");
const Producttype = require("../model/productType");
const Product = require("../model/products");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controller/register_loginuser");
const {
  registerProduct,
  getallproducttype,
} = require("../controller/registerProducts");
const {
  enterProduct,
  getmedicalproduct,
  getmedicalproductbytype,
  editmedicalproduct,
  addcomment,
  deletemedicalproduct,
  getRecentProds,
} = require("../controller/enterproduct");
const fetchUsers = require("../middleware/fetch");

const { getlike, getMostlike } = require("../controller/like_dislike");

// setting  up router
const routes = express.Router();

// setting up request
routes.get("/", (req, res) => {
  res.send(`Server is there :) 😊`);
});

// const type = req.params.type;
// console.log("type", type);
// try {
//   const products = await Producttype.find();
//   return await res.status(200).json(products);
// } catch (error) {
//   console.log("findingerror", error);
//   return await res.status(200).json({ error: "Can't get the products 😒" });
// }
// });

// sign up
routes.post("/signup", registerUser);

// login
routes.post("/login", loginUser);

// get user login
routes.post("/getUser", fetchUsers, getUsers);

// get request for products
routes.get("/getallproducttype", getallproducttype);

// get registered products
routes.post("/registerproduct", fetchUsers, registerProduct);

// edit medical product
routes.patch("/editmedicalproduct/:id", fetchUsers, editmedicalproduct);

// add comment
routes.patch("/addcomment/:id", fetchUsers, addcomment);

// delete medicalproduct
routes.delete("/delete/:id", fetchUsers, deletemedicalproduct);

// practicing populate()
routes.get("/getall", fetchUsers, async (req, res) => {
  //const id = req.params.id;
  //console.log("id", id);
  console.log("hello", user);
  try {
    const products = await Product.find(
      { owner: user._id },
      { productname: 1, type: 1 }
    ).populate("owner");
    if (products !== "") {
      return res.status(200).json(products);
    } else {
      return res.status(400).send("This user don't have any product");
    }
  } catch (error) {
    console.log("err", error);
    return res.status(400).send("This user don't have any product");
  }
});

// get recent products
routes.get("/recent", getRecentProds);

// get liked and dislike product
routes.post("/like/:id", fetchUsers, getlike);

// get mostlike
routes.get("/mostlike", fetchUsers, getMostlike);

// get medical product
routes.get("/getmedicalproduct", getmedicalproduct);

// get medical product by product types
routes.get("/getmedicalproductbytype", getmedicalproductbytype);

// update request for product
// routes.patch("/updatecomment/:id", fetchUsers, async (req, res) => {
//   const id = req.params.id;
//   const { comment } = req.body;
//   const { productname } = req.body;
//   const { like } = req.body;
//   console.log("req", req.body);

//   const prodarray = await Producttype.findById(id, {
//     _id: 0,
//     comment: 0,
//     __v: 0,
//     type: 0,
//     like: 0,
//   });
//   let valid = true;
//   console.log("product", productname);
//   prodarray.productname.forEach((element) => {
//     console.log("ele", element);
//     if (element == productname) {
//       valid = false;
//     }
//   });

//   try {
//     if (valid) {
//       const newprod = await Producttype.findByIdAndUpdate(
//         id,

//         {
//           comment,
//           like,
//           $push: {
//             productname,
//           },
//         },

//         { new: true }
//       );
//       return await res.status(200).json(newprod);
//     } else {
//       return await res.status(400).json({ message: "Product already exist" });
//     }
//   } catch (error) {
//     console.log("updateerror", error);
//     return await res.status(400).json({ error: "Update failed" });
//   }
// });

// // delete any product
// routes.delete("/deleteproduct/:type", fetchUsers, async (req, res) => {
//   const type = req.params.type;
//   console.log("type", type);
//   try {
//     const products = await Producttype.deleteOne({ type: req.params.type });
//     return await res.status(200).json(products);
//   } catch (error) {
//     console.log("deleterror", error);
//     return await res.status(400).json({ error: "Can't delete 😒" });
//   }
// });

//     const medproducts = await Product.find(
//       { id: ObjectId },
//       { productname: 1, type: 1 }
//     );
//     return res.status(200).json(medproducts);
//   } catch (error) {
//     console.log("getdta", error);
//     return res.status(400).json({ error: "Can't get the data 😓" });
//   }
// });

routes.post("/enter", fetchUsers, enterProduct);
// exporting routes
module.exports = routes;
