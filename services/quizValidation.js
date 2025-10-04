const jwt = require("jsonwebtoken")

const quizValidation = (req,res,next) => {
    const {title} = req.body;

     if(!title){
        return res.status(400).send({msg:"Missing required fields"});
    }

    next()
}

module.exports = {quizValidation}