const express = require("express");
const userModel = require("./login-model");
const authorization = require("../middleware/authorization");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get(`/`, authorization(), async (req, res) => {
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
    const { UserName, Password } = req.body;
    const [userFind] = await userModel.findBy(UserName);
    const passwordValid = await bcrypt.compare(Password, userFind.Password);
    if (userFind && passwordValid) {
      req.session.user = userFind;
      res.status(200).json({ success: "Access Granted" });
    } else {
      res.status(401).json({ error: "Auth Failed" });
    }
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
