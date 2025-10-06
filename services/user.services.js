const { UserModel } = require("../models/user.model");

const getUser = async(email) =>{
try{
    const isPresent = await UserModel.findOne({ email });
    return isPresent;
}catch(err){
    console.log("error in getuser ", err.message)
    return ;
}
}




module.exports = {getUser}