const express = require("express");
const { createQuestion, getQuestions } = require("../controllers/question.controller");
const { authentication } = require("../middleware/authentication");
const { isAdmin } = require("../middleware/isAdmin");
const { questionValidation } = require("../middleware/questionValidation");

const questionRouter = express.Router()

questionRouter
.post("/",authentication, isAdmin, questionValidation, createQuestion)
.get("/:quizId", authentication, getQuestions)

module.exports = {questionRouter}