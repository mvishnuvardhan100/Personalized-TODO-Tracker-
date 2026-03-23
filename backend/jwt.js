const jwt = require("jsonwebtoken");
const secret = "1234@__1---100056678";

function getJWT(obj) {
  return jwt.sign(obj, secret);
}

function verifyJWT(obj) {
  return jwt.verify(obj, secret);
}

module.exports = {
  getJWT,
  verifyJWT
}