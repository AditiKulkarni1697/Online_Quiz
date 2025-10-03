const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {type:String, unique: true, required: [true, "Email is required"]},
    password: {type:String, required: [true, "Password is required"]},
    role: {type:String,  enum: ["user", "admin"], default: "user"}
})

const UserModel =  new mongoose.model("User", userSchema);

module.exports = {UserModel}