const jwt = require("jsonwebtoken");
const MedUsers = require("../model/medicalusers");

const secret_key = "abdulbasitkagzi";

async function fetchUsers(req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log("token1", token);
  if (!token) {
    return res.status(401).send("Please login to do the changes");
  }

  try {
    const data = jwt.verify(token, secret_key);
    console.log("data is here", data);

    const meduser = await MedUsers.findById(data).select("-password");
    user = meduser;
    console.log(meduser);

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
}

module.exports = fetchUsers;
