const express = require("express");
const { submitQuiz } = require("../controllers/submit.controller");
const { authentication } = require("../middleware/authentication");
const { submitValidation } = require("../middleware/submitValidation");

const submitRouter = express.Router()

submitRouter
.post("/", authentication, submitValidation, submitQuiz)

module.exports = {submitRouter}