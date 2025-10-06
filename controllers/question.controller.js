const { QuestionModel } = require("../models/question.model")

const createQuestion = async(req,res) => {
 const {questionText, Options, correctAnswer, questionType, quizId, quiz} = req.body

 try{
 const question = new QuestionModel({questionText, Options, correctAnswer, questionType, quizId})

 await question.save()

 quiz.no_of_questions =  (quiz.no_of_questions || 0) + 1

 await quiz.save()

 res.status(201).send({msg:"Question created successfully"})

 }catch(err){
    res.status(500).send({msg:"Internal Server Error"})
 }

}

const getQuestions =  async(req,res) => {

    const {quizId} = req.params;

    try{
        const questions = await QuestionModel.find({quizId: quizId}).select("questionText Options")

        return res.status(200).send({questions, quizId})

    }catch(err){
        return res.status(500).send({msg:"Internal Server Error"})

    }
}



module.exports = {createQuestion, getQuestions}