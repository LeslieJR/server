const jwt = require("jsonwebtoken");
const models = require("../models");
const config = require("../config");
const { unlink } = require("fs/promises");

const isTokenValid = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({ err: "token does not exist" });
    }

    const data = jwt.verify(token, config.jwt.secret);
    //*mirar si falla -> stringify */
    req.body.data = data;
    if (!data) {
      if (req.file) {
        await unlink(req.file.path);
      }
      return res.json({ err: "token does not exist" });
    }
    next();
  } catch (err) {
    return res.json({ err: err.message });
  }
};

/*tendría que ser upload > isTokenValid > isOwner
o si trabajamos con sessions: isTokenValid > upload > isOwner
*/

const isOwner = async (req, res, next) => {
  try {
    const { data } = req.body;
    /*json parse */
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
  } catch (err) {
    return res.json({ err: err.message });
  }
};

const validateDetails = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return next();
    }
    const data = jwt.verify(token, config.jwt.secret);
    if (!data) {
      return next();
    }
    const email = data.email;
    const user = await models.user.findOne({ email });
    if (!user) {
      return next();
    }
    //enviamos el user id del usuario logeado (segun el token) para compararlo con el owner del post
    req.body.userId = user._id;
    next();
  } catch (err) {
    return res.json({ err: err.message });
  }
};
module.exports = {
  isTokenValid,
  isOwner,
  validateDetails,
};
