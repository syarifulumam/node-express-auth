import express from 'express'
import { getUsers,updateUser,deleteUser } from '../controller/userController.js';

const router = express.Router();

router.get('/user', getUsers);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser)

export default router;