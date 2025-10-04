const { QuestionModel } = require("../models/question.model");
const { calculateScore } = require("../services/calculateScore");

const submitQuiz = async(req,res) => {
    const {quizId, ansArr} = req.body;

    try{
    const correctOptions = await QuestionModel.find({quizId}).select("correctOption")

    if(ansArr.length !== correctOptions.length){
        return res.status(400).send({msg:"Incorrect input, please try again"})
    }

    let score = calculateScore(ansArr, correctOptions)
    
    console.log("correctOptions ansArr", correctOptions,ansArr)

    return res.status(200).send({msg:"Quiz submitted successfully", result:{score, total:correctOptions.length}})
    }catch(err){
        res.status(500).send({msg:"Internal Server Error"})
    }

}

module.exports = {submitQuiz}