const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    questionText : {type:String, required: [true, "Question text required"]},
    questionType : {type:String, enum: ["multiple", "single", "text-based"]},
    Options : {type: [String],
        validate: [
            {
                validator: function(arr) {
                    
                    if (this.questionType === "multiple" || this.questionType === "single") {
                        return Array.isArray(arr) && arr.length === 4;
                    }
                    // If text-based, Options should be undefined or empty
                    return arr === undefined || arr.length === 0;
                },
                message: "Options must have exactly 4 options for multiple/single choice questions, and none for text-based questions."
            }
        ]
    },
    correctAnswer :  {type:[String], required: [true, "Correct option required"]},
    quizId: {type: mongoose.Schema.Types.ObjectId, ref:'Quiz', required: [true, "QuizId required"]}
})

const QuestionModel = new mongoose.model("Question", questionSchema);

module.exports = {QuestionModel}