import express from 'express'
import { getUsers,updateUser,deleteUser } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/user', verifyToken, getUsers);
router.patch('/user/:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, deleteUser)

export default router;