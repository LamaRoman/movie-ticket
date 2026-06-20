import multer from "multer";
import fs from 'fs'

const UPLOAD_DIR = 'uploads/'

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (!req.user) {
            return cb(new Error('User not authenticated'))
        }

        cb(null, UPLOAD_DIR)
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only jpeg,png, and webp images are allowed'), false)
    }
}
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})