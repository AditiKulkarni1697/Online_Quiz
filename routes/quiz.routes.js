const express = require("express");
const { createQuiz, getQuiz } = require("../controllers/quiz.controller");
const { quizValidation } = require("../services/quizValidation");
const { isAdmin } = require("../middleware/isAdmin");
const { authentication } = require("../middleware/authentication");
const { rateLimiter } = require("../middleware/rateLimiter");

const quizRouter = express.Router();

quizRouter
.post("/",authentication, isAdmin, quizValidation, createQuiz)
.get("/", rateLimiter, authentication, getQuiz)

module.exports = {quizRouter}