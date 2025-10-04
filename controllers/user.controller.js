const { UserModel } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUser } = require("../services/user.services");

const userRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const alreadyPresent = await getUser(email)

    if (alreadyPresent) {
      return res.status(400).send({ msg: "User already present" });
    }

    const hash = await bcrypt.hash(password, 8);

    const user = new UserModel({ email, password: hash });

    await user.save();

    return res.status(201).send({ msg: "User registered successfully" });
  } catch (err) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isPresent = await getUser(email)

    if (!isPresent) {
      return res.status(400).send({ msg: "Please register" });
    }

    const compare = await bcrypt.compare(password, isPresent.password);

    if (!compare) {
      return res.status(400).send({ msg: "Wrong credentials" });
    }

    const token =  jwt.sign({ email }, process.env.SECRET, {expiresIn:"2h"});

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "Lax", // or "None" if cross-site
      expires: new Date(Date.now() + 7200000), //120 mins
    });

    return res
      .status(200)
      .send({ msg: "Login successful", user: isPresent.email });
  } catch (err) {
    console.log("error in logging in", err)
    return res.status(500).send({msg:"Internal Server Error"})
  }
};

const updateRole = async(req,res) => {
  const {user, role} = req.body;

  try{
    
    const isPresent = await getUser(user)

    if(!isPresent){
      return res.status(400).send({msg:"Please register the user first"})
    }

    isPresent.role = role
    await isPresent.save()

    return res.status(200).send({msg:"User role updated successfully"})
  }catch(err){
    return res.status(500).send({msg:"Internal Server Error"})
  }

}

module.exports = { userRegister, userLogin, updateRole};
