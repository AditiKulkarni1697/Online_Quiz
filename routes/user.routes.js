const express = require("express");
const { userValidation, checkRole } = require("../services/userValidation");
const { userRegister, userLogin, updateRole } = require("../controllers/user.controller");
const { isAdmin } = require("../middleware/isAdmin");
const { rateLimiter } = require("../middleware/rateLimiter");
const { authentication } = require("../middleware/authentication");

const userRouter = express.Router();

userRouter
.post("/register", userValidation, userRegister)
.post("/login", rateLimiter, userValidation, userLogin)
.patch("/role", authentication, isAdmin, checkRole, updateRole)

module.exports = {userRouter}