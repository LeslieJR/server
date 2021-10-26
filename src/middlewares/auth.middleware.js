const jwt = require("jsonwebtoken");
const models = require("../models");
const config = require("../config");
const { unlink } = require("fs/promises");

const isTokenValid = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ err: "token does not exist" });
  }

  const data = jwt.verify(token, config.jwt.secret);

  if (!data) {
    return res.json({ err: "token does not exist" });
  }
  next();
};

const isOwner = async (req, res, next) => {
  const token = req.headers.token;
  const data = jwt.verify(token, config.jwt.secret);
  const email = data.email;
  const user = await models.user.findOne({ email });
  if (!user) {
    if (req.file) {
      await unlink(req.file.path);
    }
    return res.json({ err: "USER DOES NOT EXIST" });
  }

  req.body.owner = user._id;
  next();
};
module.exports = {
  isTokenValid,
  isOwner,
};
