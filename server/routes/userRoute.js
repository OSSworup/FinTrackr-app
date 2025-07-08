import { Router } from "express";
import { signup,login,profile } from "../controllers/userController.js";
import {jwtAuthMiddleware} from '../middlewares/jwt.js';
const router=Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/profile',jwtAuthMiddleware,profile);

export default router;