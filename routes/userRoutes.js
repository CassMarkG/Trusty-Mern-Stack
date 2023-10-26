import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Import the protect middleware
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const router = express.Router();

// Protected route to get the user's profile information
router.get(
  '/profile',
  protect, // Apply the protect middleware to authenticate the request
  asyncHandler(async (req, res) => {
    // The authenticated user object is available in req.user due to the protect middleware
    // You can access the user's information here
    res.json(req.user); // Return the user object (excluding the password) as the response
  })
);

// router.get('/getuser',getUser);
// router.post('/',createUser);
// router.post('/login',loginUser);

export default router;
