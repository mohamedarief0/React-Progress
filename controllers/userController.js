const User = require("../models/user"); // match the lowercase filename

// Create user
const createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Update user
const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // Ensures new data follows schema validation
  });
  res.json(updatedUser);
};

// Delete user
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
