const validator = require("validator");
const createToken = require("../../utils").createToken;
const bcrypt = require("bcrypt");
const User = require("../../models/auth");
const signUp = async (req, res) => {

    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message: "Invalid email"});
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({message: "Password should at least have 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"});
    }
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User alread exists"});
        }
        const salt = await(bcrypt.genSalt(10));
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: false,
            isVerified: false,
        });
        const token = createToken(newUser._id);
        return res.status(201).json({user:{
            id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            isAdmin: newUser.isAdmin,
            isVerified: newUser.isVerified,
        }, token});
    } catch(error){
        return res.status(500).json({message: "Error creating user", error: error.message});
    }
};
module.exports = {signUp};