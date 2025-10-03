const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const isAdmin = async(req,res, next) =>{
    const {token} = req.cookies;

    const data = jwt.verify(token, process.env.SECRET)

    const admin = await UserModel.findOne({email: data.email})

    if(!admin || admin.role !== "admin"){
        return res.status(400).send({msg:"Unauthorized"})
    }

    req.body.admin = admin

    next()
}

module.exports = {isAdmin}