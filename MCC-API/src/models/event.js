const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            unique: false,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            unique: false,
            trim: true,
        },
        date: {
            type: Date,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        userName: {
            type: String,
            required: true,
        },
        ownerId: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

