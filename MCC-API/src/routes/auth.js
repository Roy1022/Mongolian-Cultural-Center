const express = require("express");
const router = express.Router();
const {signUp, signIn, getUsers, updateUser} = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/users", getUsers);
router.put("/user/:userId", updateUser);

module.exports = router;