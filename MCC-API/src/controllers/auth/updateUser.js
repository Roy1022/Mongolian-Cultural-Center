const bcrypt = require("bcrypt");
const User = require("../../models/auth");

const updateUser = async (req, res) => {
  const id = req.params.userId;
  const { username, email, password, isAdmin, isVerified } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const fields = { username, email, isAdmin, isVerified };

    for (let key in fields) {
      if (fields[key] !== undefined) user[key] = fields[key];
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

module.exports = { updateUser };
