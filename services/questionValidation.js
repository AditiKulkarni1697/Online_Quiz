const { QuizModel } = require("../models/quiz.model")

const questionValidation = async(req,res,next) => {
    const {questionText, Options, correctAnswer, questionType, quizId, admin} = req.body

    if(!questionText || !correctAnswer || !quizId || !questionType){
        return res.status(400).send({msg:"questionText, correctAnswer , questionType and quizId are required"})
    }

    if(!questionType === "multiple" || !questionType === "single" || questionType === "text-based"){
         return res.status(400).send({msg:"questionType is required"})
    }

    if((questionType === "multiple" || questionType === "single") && (!Array.isArray(Options) || Options.length !== 4) ){
        return res.status(400).send({msg:"multiple and single choice questions should have Options array with 4 length"})
    }

    if(questionType === "text-based" && correctAnswer[0].length > 300){
        return res.status(400).send({msg:"text-based question should have maximum 300 length"})
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