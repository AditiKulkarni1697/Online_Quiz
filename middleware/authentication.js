const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { getUser } = require("../services/user.services");
const authentication = async(req,res,next) => {
    const {token} = req.cookies;

    try{
        if(!token){
            return res.status(400).send({msg:"Please login"})
        }

    const user = jwt.verify(token,process.env.SECRET)

        if(!user){
            return res.status(400).send({msg:"Please login"})
        }

    const isPresent = await getUser(user.email)

        if(!isPresent){
            return res.status(400).send({msg:"Wrong Credentials"})
        }

        req.isPresent = isPresent

    next()
}catch(err){
    console.log("error in authentication", err.message)
    return res.status(500).send("Internal Server Error")
}
}

module.exports = {authentication}