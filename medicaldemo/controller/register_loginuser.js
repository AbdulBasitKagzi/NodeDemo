const MedUsers = require("../model/medicalusers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const fetchUsers = require("../middleware/fetch");

const secret_key = "abdulbasitkagzi";

// handle errors
const handleError = (err) => {
  console.log(err.message);
  let error = {
    email: "",
  };
  if (err.code === 11000) {
    error.email = "This email is already registered";
    return error;
  }
  // if (err.message.includes("User validation failed")) {
  //   // console.log("validaton", err);
  //   Object.values(err.errors).forEach(({ properties }) => {
  //     error[properties.path] = properties.message;
  //     console.log("hello", properties);
  //   });
  // }
  // return error;
};

// function for errors
// async function validerrors(firstname, lastname, email, password) {
//   if (firstname === "" && lastname === "" && email === "" && password === "") {
//     return "Please enter firstname, lastname, email, password";
//   } else if (firstname === "" && email === "" && password === "") {
//     return "Please enter firstname email, password";
//   } else if (lastname === "" && email === "" && password === "") {
//     return "Please enter lastname,email, password";
//   } else if (lastname === "" && email === "") {
//     return "Please enter lastname,email";
//   } else if (email === "" && password === "") {
//     return "Please enter  email, pssword";
//   } else if (email === "") {
//     return "Please enter  email";
//   } else if (password === "") {
//     return "Please enter password";
//   } else if (firstname === "") {
//     return "Please enter firstname";
//   } else if (lastname === "") {
//     return "Please enter lastname";
//   }
// }

// function for registering user
async function registerUser(req, res) {
  const { firstname, lastname, email, password } = req.body;

  // creating a hash password
  // console.log("secure", securePass);

  // return res
  //   .status(400)
  //   .send(validerrors(firstname, lastname, email, password));
  try {
    if (
      firstname === "" &&
      lastname === "" &&
      email === "" &&
      password === ""
    ) {
      return res
        .status(400)
        .send("Please enter firstname, lastname, email, password");
    } else if (firstname === "" && email === "" && password === "") {
      return res.status(400).send("Please enter firstname, email, password");
    } else if (lastname === "" && email === "" && password === "") {
      return res.status(400).send("Please enter lastname, email, password");
    } else if (lastname === "" && email === "") {
      return res.status(400).send("Please enter lastname, email");
    } else if (email === "" && password === "") {
      return res.status(400).send("Please enter  email, password");
    } else if (email === "") {
      return res.status(400).send("Please enter  email");
    } else if (password === "") {
      return res.status(400).send("Please enter password");
    } else if (firstname === "") {
      return res.status(400).send("Please enter firstname");
    } else if (lastname === "") {
      return res.status(400).send("Please enter lastname");
    } else {
      const securePass = await bcrypt.hash(req.body.password, 10);
      const meduser = await MedUsers.create({
        firstname,
        lastname,
        email,
        password,
      });

      const token = jwt.sign(meduser.id, secret_key);

      console.log("token", token);
      return await res.status(201).json({ meduser, token });
    }
  } catch (err) {
    // console.log("error", err);
    if (err.code === 11000) {
      const error = handleError(err);
      Object.values(error).forEach((ele) => {
        return res.status(400).send(ele);
      });
    } else {
      return res.status(400).send("Enter valid email");
    }

    // console.log("signup", err);
  }
}

// function to loguser
async function loginUser(req, res) {
  const { email, password } = req.body;

  // doing validation
  if (email === "" && password === "") {
    return res.status(401).send("Enter email and password");
  } else if (email === "") {
    return res.status(401).send("Enter email");
  } else if (password === "") {
    return res.status(401).send("Enter password");
  }
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
      const token = jwt.sign(user.id, secret_key);
      return res.status(201).json({ success, token });
    } else if (!comparepass) {
      return res.status(400).send("Password is incorrect");
    }
  } catch (error) {
    return res.status(400).send("User not available");
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
    return res.status(401).json({ error: "Please get authenticated first" });
  }
}
// exporting function
module.exports = { registerUser, loginUser, secret_key, getUsers };
