const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No authorization header provided" });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Invalid authorization header format" });
  }

  const token = tokenParts[1];

  try {
    console.log(token);
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
