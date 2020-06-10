// User auth helpers
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} returns True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper
   * @param {string} email
   * @returns {Boolean} True of False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email); // does the email follow format *@*.* , eg test@test.test
  },
  /**
   * Generate JWT
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id,
      },
      process.env.SECRET,
      { expiresIn: "2h" }
    );
    return token;
  },
};

export default Helper;
