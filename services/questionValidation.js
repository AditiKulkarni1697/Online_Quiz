const { QuizModel } = require("../models/quiz.model")

const questionValidation = async(req,res,next) => {
    const {questionText, multipleOptions, correctOption, quizId, admin} = req.body

    if(!questionText || !correctOption || !quizId){
        return res.status(400).send({msg:"questionText, correctOption and quizId are required"})
    }

    if(!Array.isArray(multipleOptions) && multipleOptions.length !== 4){
        return res.status(400).send({msg:"multipleOptions should be an array"})
    }

    const quiz = await QuizModel.findById(quizId)

    if(!quiz){
        return res.status(400).send({msg:"Please create quiz first"})
    }
    
    if(admin._id.toString() !== quiz.author.toString() ) {
        return res.status(401).send({msg:"Unauthorized"})
    }
    req.body.quiz = quiz


    next()
}

const checkQuizId = (req,res,next) => {
    const {quizId} = req.params;
     if(!quizId){
            return res.status(400).send({msg:"please provide quizId"})
        }
    next()
}

module.exports = {questionValidation, checkQuizId}