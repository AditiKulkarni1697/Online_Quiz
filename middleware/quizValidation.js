const jwt = require("jsonwebtoken")

const quizValidation = (req,res,next) => {
    const {title} = req.body;

     if(!title){
        return res.status(400).send({msg:"Missing required fields"});
    }
    
    const {token} = req.cookies;


    const data = jwt.verify(token, process.env.SECRET)

    req.body.data = data

    next()
}

module.exports = {quizValidation}