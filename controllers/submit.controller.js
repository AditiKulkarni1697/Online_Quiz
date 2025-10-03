const { QuestionModel } = require("../models/question.model");

const submitQuiz = async(req,res) => {
    const {quizId, ansArr} = req.body;

    try{
    const correctOptions = await QuestionModel.find({quizId}).select("correctOption")

    if(ansArr.length !== correctOptions.length){
        return res.status(400).send({msg:"Incorrect input, please try again"})
    }

    let response = correctOptions.length
   for(let i=0;i<correctOptions.length;i++){
    if(correctOptions[i].correctOption != ansArr[i]){
        --response
    }
   }

   return res.status(200).send({msg:"Quiz submitted successfully", result:`${response}/${correctOptions.length}`})
    }catch(err){
        res.status(500).send({msg:"Internal Server Error"})
    }

}

module.exports = {submitQuiz}