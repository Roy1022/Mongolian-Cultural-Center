const Event = require("../../models/event");
const getEvents = async (req, res) => {
    try{
        const events = await Event.find().sort({ createdAt: -1 });
        return res.status(200).json(events);
    }   
    catch(error){
        return res.status(500).json({error: error.message});
    }
};

module.exports = {getEvents};

