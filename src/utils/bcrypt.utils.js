const bcrypt = require('bcrypt');

encrypt = async (password) => {
  return await bcrypt.hash(password, 10);
};

compare = async (passwordPlane, passwordEncrypt) => {
  return await bcrypt.compare(passwordPlane, passwordEncrypt);
};

module.exports = {
  encrypt,
  compare,
};