import express from 'express';
import dotenv from 'dotenv';
import {
    createUser, login, updateUser, getUser, checkEmail, changePassword, getAllStudents,
    updateStatus,
    approveTeacher,
    getActiveAndSuspendedTeachers,
    getAllPendingTeachers,
    rejectTeacher,
    updateProfile,
    changeProfilePassword

} from '../controllers/user.js';
import { authorizeRoles, verifyUser } from '../middlewares/verifyUser.js';

dotenv.config();

const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);
router.get('/verify', verifyUser, getUser);
router.put('/update', updateUser);
router.put('/update-profile', verifyUser, updateProfile);
router.post('/check-email', checkEmail);
router.post('/change-password', changePassword);
router.get('/all-students', getAllStudents);
router.put('/update-status/:id', updateStatus);

router.get('/all-teachers', getActiveAndSuspendedTeachers);
router.get('/all-pending-teachers', getAllPendingTeachers);
router.put('/approve-teacher/:id', approveTeacher);
router.put('/reject-teacher/:id', rejectTeacher);
router.post('/change-profile-password', verifyUser, changeProfilePassword);




export default router;