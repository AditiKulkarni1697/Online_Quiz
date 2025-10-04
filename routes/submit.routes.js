const express = require("express");
const { submitQuiz } = require("../controllers/submit.controller");
const { authentication } = require("../middleware/authentication");
const { submitValidation } = require("../services/submitValidation");
const { rateLimiter } = require("../middleware/rateLimiter");

const submitRouter = express.Router()

submitRouter
.post("/", rateLimiter, authentication, submitValidation, submitQuiz)

module.exports = {submitRouter}