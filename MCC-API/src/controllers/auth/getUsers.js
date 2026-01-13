const User = require("../../models/auth");

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers };
