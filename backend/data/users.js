const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Pankaj Yadav",
    email: "pankaj38@gmail.com",
    password: bcrypt.hashSync("122346", 10),
    isAdmin: "true",
  },
  {
    name: "Ravi Kumar",
    email: "ravi@gmail.com",
    password: bcrypt.hashSync("122346", 10),
  },
  {
    name: "Mr Rahul",
    email: "rkr@gmail.com",
    password: bcrypt.hashSync("122346", 10),
  },
];

module.exports = users;
