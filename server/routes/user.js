import express from 'express';
import dotenv from 'dotenv';
import { createUser, login, updateUser, getUser } from '../controllers/user.js';
import { authorizeRoles, verifyUser } from '../middlewares/verifyUser.js';

dotenv.config();

const router = express.Router();

router.post('/register', verifyUser, authorizeRoles('admin'), createUser); // Only admin can register new users with roles
router.post('/login', login); // Anyone can log in
router.get('/verify', verifyUser, getUser); // Verified users can access this route
router.put('/update', verifyUser, authorizeRoles('admin', 'teacher'), updateUser); // Only admins or teachers can update users


export default router;