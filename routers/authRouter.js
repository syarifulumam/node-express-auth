import express from 'express'
import { login,register,logout } from '../controller/authController.js'
import { verifyToken } from '../middleware/verifyToken.js';
import { refreshToken } from '../utils/refreshToken.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.delete('/logout', logout);
router.get('/token', refreshToken);

export default router;