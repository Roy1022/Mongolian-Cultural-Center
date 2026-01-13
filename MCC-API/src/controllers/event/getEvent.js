const mongoose = require("mongoose");
const Event = require("../../models/event");
const getEvent = async (req, res) => {
    try{
        const { eventId } = req.params;
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({message: "Invalid Event ID"});
        }
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }
        return res.status(200).json(event);
    }   
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getEvent};

