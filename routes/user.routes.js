const express = require("express");
const { userValidation } = require("../middleware/userValidation");
const { userRegister, userLogin, updateRole } = require("../controllers/user.controller");
const { isAdmin } = require("../middleware/isAdmin");

const userRouter = express.Router();

userRouter
.post("/register", userValidation, userRegister)
.post("/login", userValidation, userLogin)
.patch("/role", isAdmin, updateRole)

module.exports = {userRouter}