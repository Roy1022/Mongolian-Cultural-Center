const mongoose = require("mongoose");
const Event = require("../../models/event");
const updateEvent = async (req, res) => {
  const id = req.params.eventId;
  const { title, description, date, location } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Event ID" });
  }
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!req.isAdmin && event.ownerId !== req.userId) {
      return res.status(403).json({ message: "You can only update your own events" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title: title || event.title,
        description: description || event.description,
        date: date || event.date,
        location: location || event.location,
      },
      { new: true }
    );
    return res.status(200).json(updatedEvent);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { updateEvent };

