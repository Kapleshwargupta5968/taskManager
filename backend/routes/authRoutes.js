const express = require("express");
const router = express.Router();
const {signUp, signIn, logout, authMe, refreshAccessToken} = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", authMe);
router.post("/refrshToken", refreshAccessToken);

module.exports = router;