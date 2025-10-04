const { QuizModel } = require("../models/quiz.model");

const submitValidation = async(req, res,next)=>{
    const {quizId, ansArr} = req.body;

    try{
    if(!quizId){
        return res.status(400).send({msg:"QuizId is required"})
    }

    const quiz = await QuizModel.findById(quizId)

    if(!Array.isArray(ansArr) || quiz.no_of_questions !== ansArr.length){
        return res.status(400).send({msg:"Incorrect Input, please try again"})
    }

    next()
}catch(err){
    res.status(500).send({msg:"Internal Server Error"})
}
}

module.exports = {submitValidation}