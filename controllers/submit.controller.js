const { QuestionModel } = require("../models/question.model");
const { calculateScore } = require("../services/calculateScore");

const submitQuiz = async(req,res) => {
    const {quizId, ansArr} = req.body;

    try{
    const correctOptions = await QuestionModel.find({quizId}).select("correctAnswer")

    if (!correctOptions || correctOptions.length === 0) {
  return res.status(400).send({ msg: "No questions found for this quiz" });
}
    if(ansArr.length !== correctOptions.length){
        return res.status(400).send({msg:"Incorrect input, please try again"})
    }

    let score = calculateScore(ansArr, correctOptions)
    
    return res.status(200).send({msg:"Quiz submitted successfully", result:{score, total:correctOptions.length}})
    }catch(err){
        console.log("err in submitQuiz", err.message)
        res.status(500).send({msg:"Internal Server Error"})
    }

}

module.exports = {submitQuiz}