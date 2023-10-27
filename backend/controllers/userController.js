// Import necessary modules
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'; // Import User model
import generateToken from '../utils/generateToken.js'; // Import a function for generating JWT tokens

// Authenticate user and return a token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body

  const user = await User.findOne({ email }); // Find a user with the given email

  // If user exists and the provided password matches the stored password
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate a JWT token and set it in the response header

    // Return user data excluding the password
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If user does not exist or password is incorrect, return an error
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // Extract name, email, and password from the request body

  // Check if the user with the given email already exists
  const userExists = await User.findOne({ email });

  // If user with the email already exists, return an error
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user with the provided name, email, and password
  const user = await User.create({
    name,
    email,
    password,
  });

  // If user is created successfully, generate a JWT token and return user data
  if (user) {
    generateToken(res, user._id);

    // Return user data excluding the password
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If user creation fails, return an error
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Logout user by clearing the JWT cookie
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get user profile (requires authentication)
const getUserProfile = asyncHandler(async (req, res) => {
  // Find the user by their ID in the request object (added by JWT authentication middleware)
  const user = await User.findById(req.user._id);

  // If user is found, return user data excluding the password
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If user is not found, return an error
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user profile (requires authentication)
const updateUserProfile = asyncHandler(async (req, res) => {
  // Find the user by their ID in the request object (added by JWT authentication middleware)
  const user = await User.findById(req.user._id);

  // If user is found, update user data and return the updated user data
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If a new password is provided, update the password
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user data to the database
    const updatedUser = await user.save();

    // Return the updated user data excluding the password
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    // If user is not found, return an error
    res.status(404);
    throw new Error('User not found');
  }
});


// Delete user profile (requires authentication)
const deleteUserProfile = asyncHandler(async (req, res) => {
    // Find the user by their ID in the request object (added by JWT authentication middleware)
    const user = await User.findById(req.user._id);
  
    // If user is found, remove the user from the database
    if (user) {
      await user.remove();
      res.json({ message: 'User removed successfully' });
    } else {
      // If user is not found, return an error
      res.status(404);
      throw new Error('User not found');
    }
  });
  
// Login user and generate a token
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body

  // Find a user with the given email
  const user = await User.findOne({ email });

  // If user exists and the provided password matches the stored password
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate a JWT token and set it in the response header

    // Return user data excluding the password
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If user does not exist or password is incorrect, return an error
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Export the controller functions for use in routes
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  loginUser, // Export the new login function
};
