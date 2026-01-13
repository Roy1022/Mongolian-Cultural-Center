const Event = require("../../models/event");
const User = require("../../models/auth");

const createEvent = async (req, res) => {
    const { title, description, userName, ownerId, date, location } = req.body;
    if(!title || !description || !userName || !ownerId) {
        return res.status(400).json({message: "Missing required fields"});
    }
    try{
        // Check if user is verified
        const user = await User.findById(ownerId);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        if(!user.isVerified) {
            return res.status(403).json({message: "Your account must be verified to create events. Contact admin for verification."});
        }

        const event = await Event.create({
            title, 
            description, 
            userName, 
            ownerId,
            date: date || null,
            location: location || null
        });
        return res.status(201).json(event);
    } 
    catch(error){
        return res.status(500).json({ error: error.message});
    }
};

module.exports = {createEvent};

