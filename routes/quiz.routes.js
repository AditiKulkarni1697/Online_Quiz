const express = require("express");
const { createQuiz, getQuiz } = require("../controllers/quiz.controller");
const { quizValidation } = require("../middleware/quizValidation");
const { isAdmin } = require("../middleware/isAdmin");
const { authentication } = require("../middleware/authentication");

const quizRouter = express.Router();

quizRouter
.post("/",authentication, isAdmin, quizValidation, createQuiz)
.get("/", authentication, getQuiz)

module.exports = {quizRouter}