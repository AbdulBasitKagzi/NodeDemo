const MedUsers = require("../model/medicalusers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const fetchUsers = require("../middleware/fetch");

const secret_key = "abdulbasitkagzi";

// function for registering user
async function registerUser(req, res) {
  const { firstname, lastname, email } = req.body;

  // creating a hash password
  const securePass = await bcrypt.hash(req.body.password, 10);
  console.log("secure", securePass);
  try {
    const meduser = await MedUsers.create({
      firstname,
      lastname,
      email,
      password: securePass,
    });
    const token = await jwt.sign(meduser.id, secret_key);

    console.log("token", token);
    return await res.status(201).json({ meduser, token });
  } catch (error) {
    console.log("signup", error);
    res.status(400).json({ error: "Email is already registered" });
  }
}
// function to loguser
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await MedUsers.findOne(
      { email },
      { email: 1, password: 1, _id: 1 }
    );

    //   console.log(meduser);
    // console.log("searchuser", user);
    const success = "User logged in";
    let comparepass = await bcrypt.compare(password, user.password);

    // console.log("compare", comparepass);

    if (user.email === email && comparepass) {
      // console.log(!comparepass);
      const token = await jwt.sign(user.id, secret_key);
      return res.status(201).json({ success, token });
    } else if (!comparepass) {
      return res.status(400).send("Password is incorrect");
    }
  } catch (error) {
    res.status(400).send("User not available");
  }
}

// login of the user is required for this function to work
async function getUsers(req, res) {
  try {
    // userId = req.meduser;
    // console.log("userid", userId);
    // .select() is to select all the field and -password is used to remove password field
    user = user;
    console.log("user", user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Please get authenticated first" });
  }
}
// exporting function
module.exports = { registerUser, loginUser, secret_key, getUsers };
