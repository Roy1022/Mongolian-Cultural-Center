const bcrypt = require("bcrypt");
const User = require("../../models/auth");
const createToken = require("../../utils").createToken;
const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found with such email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
module.exports = { signIn };
