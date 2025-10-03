const express = require("express");
const { createQuiz, getQuiz } = require("../controllers/quiz.controller");
const { quizValidation } = require("../middleware/quizValidation");

const quizRouter = express.Router();

quizRouter
.post("/", quizValidation, createQuiz)
.get("/", getQuiz)

module.exports = {quizRouter}