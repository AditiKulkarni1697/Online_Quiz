const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    questionText : {type:String, required: [true, "Question text required"]},
    multipleOptions : {type: [String],
        validate: [
            arr => arr.length === 4,
            "multipleOptions must have exactly 4 options"
        ]
    },
    correctOption :  {type:String, required: [true, "Correct option required"]},
    quizId: {type: mongoose.Schema.Types.ObjectId, ref:'Quiz', required: [true, "QuizId required"]}
})

const QuestionModel = new mongoose.model("Question", questionSchema);

module.exports = {QuestionModel}