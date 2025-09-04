import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token =
    // req.header("x-auth-token") || req.header("Authorization")?.split(" ")[1];
    //x-auth-token is just a manual way of adding a token header, it is overkill if Authorization works
    req.cookies?.jwt || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    console.log("decoded", decoded);

    //req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
