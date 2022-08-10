// import
const mongoose = require("mongoose");
const { isEmail } = require("validator");

// creating scehma in mongoose
const medicalSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: true,
    lowerCase: true,
  },
  lastname: {
    type: String,
    require: true,
    lowerCase: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
    validate: [isEmail, "Please enter a valide email"],
  },
  password: {
    type: String,
    require: true,
  },
});

// medicalSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   delete userObject._id;

//   return userObject;
// };

// creating model
const MedUsers = mongoose.model("User", medicalSchema);

// exporting the model
module.exports = MedUsers;
