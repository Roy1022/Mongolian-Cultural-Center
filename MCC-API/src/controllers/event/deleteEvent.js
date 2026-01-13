const mongoose = require("mongoose");
const Event = require("../../models/event");
const deleteEvent = async (req, res) => {
    const id = req.params.eventId;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Event ID"});
    }
    try{
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({message: "Event not found"});
        }

        if (!req.isAdmin && event.ownerId !== req.userId) {
            return res.status(403).json({message: "You can only delete your own events"});
        }
   
        await Event.findByIdAndDelete(id);
        return res.status(200).json({message: `Event with id ${id} deleted successfully 🗑️`});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

module.exports = {deleteEvent};

