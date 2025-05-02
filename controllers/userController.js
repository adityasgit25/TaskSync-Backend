import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.country = req.body.country || user.country;
    
    // Only update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getProfile, updateProfile };