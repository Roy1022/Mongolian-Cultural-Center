const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({message: "No Token Provided"});
    }
    const token = authorization.replace("Bearer ", "");
    try{
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        const { id } = decoded_token;

        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({message: "User not found"});
        }

        req.userId = id;
        req.user = user;
        req.isAdmin = user.isAdmin;

        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid Token"});
    }
}

module.exports = { authentication };