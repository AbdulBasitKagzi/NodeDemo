// imports
const express = require("express");
const mongoose = require("mongoose");

// importing routes
const routes = require("./route/routes");

// setting up the server
const app = express();

app.use(express.json());
// using routes as middleware
app.use(routes);

// setting up monogdb connection
mongoose.connection.once("open", () => {
  console.log(`Mongoose connected`);
});
mongoose.connection.on("error", (err) => {
  console.log(`Error hai bhai ${err}`);
});

mongoose.connect("mongodb://localhost:27017/medical");

// starting the server
app.listen(3000, () => {
  console.log(`Server Started at 3000...`);
});
