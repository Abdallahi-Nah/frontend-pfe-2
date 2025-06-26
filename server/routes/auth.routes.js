const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  verifyPasswordResetCode,
  resetPassword,
} = require("../controller/authService");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router({ mergeParams: true });

router.post("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-code", verifyPasswordResetCode);

router.put("/reset-password", resetPassword);

module.exports = router;
