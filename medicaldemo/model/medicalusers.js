// import
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

// creating scehma in mongoose
const medicalSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please  enter firstname"],
    lowerCase: true,
  },
  lastname: {
    type: String,
    required: [true, "Please enter lastname"],
    lowerCase: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    lowerCase: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});

medicalSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject._id;
  delete userObject.firstname, delete userObject.lastname;
  return userObject;
};

medicalSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
// medicalSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();
//   delete userObject.password;
//   delete userObject._id;
//   // delete UserObject.firstname,
//   // delete UserObject.lastname,

//   return userObject;
// };

// medicalSchema.methods.toJSON = function () {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.createdAt;
//   delete userObject.updatedAt;
//   return userObject;
// };

// creating model
const MedUsers = mongoose.model("User", medicalSchema);

// exporting the model
module.exports = MedUsers;
