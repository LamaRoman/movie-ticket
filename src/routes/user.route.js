import { Router } from "express";
import { getProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {handleMulterError} from '../middleware/handleMulterError.js'
import { uploadProfilePicture } from "../controllers/user.controller.js";

const router = Router();

router.use(authenticate)

router.post('/profile-picture',
    upload.single('image'),
    handleMulterError,
    uploadProfilePicture
)
router.get('/profile',getProfile)

export default router;