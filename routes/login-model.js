const db = require("../db-config");
const bcrypt = require("bcryptjs");

function getUsers() {
  return db("users");
}

function findBy(username) {
  return db("users")
    .select("*")
    .where("UserName", username)
    .first();
}
async function registerUser(user) {
  user.Password = await bcrypt.hash(user.Password, 14);
  await db("users").insert(user);
  return getUsers();
}

async function loginUser(user) {
  const { UserName, Password } = user;
  const userFind = await findBy(UserName);
  const passwordValid = await bcrypt.compare(Password, userFind.Password);
  if (userFind && passwordValid) {
    return { success: "User Found" };
  } else {
    return { fail: "none shall pass ye hacker man" };
  }
}

module.exports = { getUsers, registerUser, loginUser };
