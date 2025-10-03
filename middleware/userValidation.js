const userValidation = (req,res,next) => {
    const {email,password} = req.body;

     if(!email || !password){
        return res.status(400).send({msg:"Missing required fields"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email) || email.length > 100){
        return res.status(400).send({msg:"Invalid email"});
    }

    if(password.length < 8 || password.length > 50){
        return res.status(400).send({msg:"Password must be between 8 to 50 characters"});
    }
    next()
}

module.exports = {userValidation}