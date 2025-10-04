const jwt = require("jsonwebtoken");

const isAdmin = async(req,res, next) =>{
    const {isPresent} = req;

    try{

    if(!isPresent || isPresent.role !== "admin"){
        return res.status(401).send({msg:"Unauthorized"})
    }

    req.body.admin = isPresent

    next()
    }catch(err){
        return res.status(500).send({msg:"Internal Server Error"})
    }
}

module.exports = {isAdmin}