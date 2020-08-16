// User auth helpers
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
exports.comparePassword = (hashPassword, password) => {
  return bcrypt.compareSync(password, hashPassword);
};
exports.generateToken = (id) => {
  const token = jwt.sign(
    {
      userId: id,
    },
    process.env.SECRET,
    { expiresIn: "2h" }
  );
  return token;
};
