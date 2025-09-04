import jwt from "jsonwebtoken";

const generateToken = (res, userId, sendAsJson = false) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // if (sendAsJson) {
  //   // For testing in Postman — send back as JSON instead of cookie
  //   return token;
  // }

  // Set JWT as an HTTP-Only cookie for production use
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // HTTPS only in production
    sameSite: "lax", // or "none" if using https
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;

// import jwt from "jsonwebtoken";

// // authentication is verifying user's identity
// // secure way to share info between client and web server and
// // jwt includes a header plyload(info about the user's id) and signiture (checks that the data was not tampered), jwt usually stored in the browser in localStorage but insecure
// //best practice is to store jwt in a http only cookie on the server, which will be sent with every request then on
// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });

//   // Set JWT as an HTTP-Only cookie
//   res.cookie("jwt", token, {
//     // we called it jwt and later access it in our protect middleware
//     httpOnly: true,
//     //https if in production otherwise in dev its http
//     secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
//     sameSite: "strict", // Prevent CSRF attacks
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// };

// export default generateToken;
