const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
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
            lowercase: true
        },
        hashTags: {
            type: [String],
            default: [],
        },
        votedUsers: {
            type: [String],
            default: [],
            required: false,
        },
        vote: {
            type: Number,
            default: 0,
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

module.exports = mongoose.model("Story", storySchema);