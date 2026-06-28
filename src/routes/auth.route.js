import { Router } from "express";
import { registerUser,loginUser,logoutUser, refreshToken } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import {registerSchema,loginSchema} from '../validators/auth.validator.js'
import { authenticate } from "../middleware/auth.js";
import {loginLimiter} from '../middleware/rateLimiter.js'

const router = Router()

router.post('/register',validate(registerSchema),registerUser)
router.post('/login',loginLimiter,validate(loginSchema),loginUser)
router.post('/logout',authenticate,logoutUser)
router.post('/refresh',refreshToken)
export default router;