const Producttype = require("../model/product");

async function getRecentProds(req, res) {
  try {
    const recentProds = await Producttype.find({}).sort({ _id: -1 });
    console.log("recent", recentProds);
    return await res.status(201).json(recentProds);
  } catch (error) {
    return await res
      .status(400)
      .json({ error: "Can't get the most recent product 😒" });
  }
}

module.exports = getRecentProds;
