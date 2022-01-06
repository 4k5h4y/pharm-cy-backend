const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, 'this_is_the_webToken_secret_key');
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" })
  }
}
