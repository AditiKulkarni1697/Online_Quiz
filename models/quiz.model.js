const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    title: {type:String, required: [true, "Title is required"]},
    author:  {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    no_of_questions: {type:Number, default: 0}
});

const QuizModel = new mongoose.model("Quiz", quizSchema);

module.exports = {QuizModel};