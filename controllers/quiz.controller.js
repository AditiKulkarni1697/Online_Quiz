const { QuizModel } = require("../models/quiz.model");
const { UserModel } = require("../models/user.model");

const createQuiz = async(req,res)=>{

    const {title, data} = req.body;

    try{

    const isAuthorPresent = await UserModel.findOne({email:data.email});

    if(!isAuthorPresent || isAuthorPresent.role !== "admin"){
        return res.status(400).send({msg:"Unathorized"})
    }
    
    const quiz = new QuizModel({title, author:isAuthorPresent._id})

    await quiz.save()

    return res.status(201).send({msg:"Quiz is created successfully"})

    }catch(err){
        return res.status(500).send({msg:"Internal Server Error"})

    }
}

const getQuiz = async(req,res) => {
    const {title,page=1} = req.query;
    const limit = 10;

    const query = {}
    if(title) {
        query.title = title;
    }
    try{
        const quizes = await QuizModel.find(query).skip((page-1)*limit).limit(limit);
        if(!quizes || quizes.length === 0){
            return res.status(200).send({msg:"No quizes found"})
        }
        return res.status(200).send({msg:"All quizes", quizes})
    }catch(err){
        return res.status(500).send({msg:"Internal Server Error"})
    }
}

module.exports = {createQuiz, getQuiz}