import bcrypt from "bcryptjs";

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    username: "john",
    email: "john@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    username: "jane",
    email: "jane@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
];
export default users;
