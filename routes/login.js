const express = require("express");
const userModel = require("./login-model");

const router = express.Router();

router.get(`/`, async (req, res) => {
  res.status(200).send(await userModel.getUsers());
});
router.post(`/register`, async (req, res) => {
  try {
    res.status(201).send(await userModel.registerUser(req.body));
  } catch (e) {
    console.log(e);
  }
});
router.post(`/login`, async (req, res) => {
  try {
    const { loginMessage } = await userModel.loginUser(req.body);
    res.status(204).send(loginMessage);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
