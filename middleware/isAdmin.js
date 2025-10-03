const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const isAdmin = async(req,res, next) =>{
    const {token} = req.cookies;

    try{
    const data = jwt.verify(token, process.env.SECRET)

    const admin = await UserModel.findOne({email: data.email})

    if(!admin || admin.role !== "admin"){
        return res.status(401).send({msg:"Unauthorized"})
    }

    req.body.admin = admin

    next()
    }catch(err){
        return res.status(500).send({msg:"Internal Server Error"})
    }
}

module.exports = {isAdmin}