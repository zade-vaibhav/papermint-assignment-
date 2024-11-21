import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
   console.log(token)
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded user info to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
