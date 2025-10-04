const express = require("express");
const { createQuestion, getQuestions } = require("../controllers/question.controller");
const { authentication } = require("../middleware/authentication");
const { isAdmin } = require("../middleware/isAdmin");
const { questionValidation, checkQuizId } = require("../services/questionValidation");
const { rateLimiter } = require("../middleware/rateLimiter");

const questionRouter = express.Router()

questionRouter
.post("/",authentication, isAdmin, questionValidation, createQuestion)
.get("/:quizId", rateLimiter, authentication, checkQuizId, getQuestions)

module.exports = {questionRouter}