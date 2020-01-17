const db = require("../db-config");
const bcrypt = require("bcryptjs");

function getUsers() {
  return db("users");
}

function findBy(username) {
  return db("users")
    .select("*")
    .where("UserName", username);
}
async function registerUser(user) {
  user.Password = await bcrypt.hash(user.Password, 14);
  await db("users").insert(user);
  return getUsers();
}

module.exports = { getUsers, registerUser, findBy };
