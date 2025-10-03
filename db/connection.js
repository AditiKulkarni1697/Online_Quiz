const  mongoose  = require("mongoose");


const connection = async()=>{ await mongoose.connect(process.env.MONGODB)}

module.exports = {connection}