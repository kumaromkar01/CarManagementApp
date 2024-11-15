import { login,signup,logout } from '../controllers/userControllers.js';
import express from 'express';
const router = express.Router();
router.post('/signup',signup );
router.post('/login',login );
router.get('/logout',logout)
export default router