import multer from "multer";
import {AppError} from '../utils/AppError.js'
import {ERRORS} from '../constants/error.constant.js'

export function handleMulterError(error,req,res,next){
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return next(new AppError(ERRORS.FILE_TOO_LARGE))
        }
        if(err.code === 'LIMIT_FILE_COUNT'){
            return next(new AppError(ERRORS.T00_MANY_FILES))
        }
        if(err.code === 'LIMIT_UNEXPECTED_FILE'){
            return next(new AppError(ERRORS.UNEXPECTED_FIELD))
        }
    }
    next(error)
}