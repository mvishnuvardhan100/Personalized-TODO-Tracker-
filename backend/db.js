require('dotenv').config();
const mongoose = require("mongoose");

const dbURI = process.env.DATABASE_URL;

async function main() {
  await mongoose.connect(dbURI);
  console.log("Database got connected");
} 

const User = mongoose.model("user", {
  firstName: String,
  lastName: String,
  email: String,
  password: String
}, "User Credentials");

const Todo = mongoose.model("todo", {
  title: String,
  description: String,
  email: String
});


main();

module.exports = {
  User,
  Todo
};