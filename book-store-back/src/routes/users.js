const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const { validEmail, validPassword, validate } = require("../utils/validation");

router.use(express.json());

router.post(
  "/join",
  [validEmail, validPassword, validate],
  UserController.join
);
router.post(
  "/login",
  [validEmail, validPassword, validate],
  UserController.login
);
router.post(
  "/reset",
  [validEmail, validate],
  UserController.passwordResetRequest
);
router.put("/reset", [validPassword, validate], UserController.passwordReset);

module.exports = router;
