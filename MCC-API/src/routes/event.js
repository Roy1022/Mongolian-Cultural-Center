const {
    createEvent,
    deleteEvent,
    getEvent,
    getEvents,
    updateEvent,
} = require("../controllers/event");
const express = require("express");
const { authentication } = require("../middleware");
const router = express.Router();

router.get("/", getEvents);
router.get("/:eventId", getEvent);

router.use(authentication);
router.post("/", createEvent);
router.put("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;

