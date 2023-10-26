import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Extract the JWT token from the request's cookies
  token = req.cookies.jwt;

  // If a token is found in the cookies
  if (token) {
    try {
      // Verify the token using the JWT_SECRET stored in the environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the decoded user ID (stored in the token)
      const user = await User.findById(decoded.userId).select('-password');

      // If user is not found, return an error response
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }

      // Check if the user is an admin
      if (user.isAdmin) {
        req.user = user; // Assign the user object to req.user
        next(); // Call the next middleware or route handler
      } else {
        // If the user is not an admin, return a 403 Forbidden error response
        res.status(403);
        throw new Error('Not authorized, admin only');
      }
    } catch (error) {
      // If token verification fails, return an error response
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    // If no token is found, return an error response
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
