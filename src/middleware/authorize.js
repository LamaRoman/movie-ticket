import {ERRORS} from '../constants/error.constant.js'
import {AppError} from '../utils/AppError.js'

export function authorize(...allowedRoles){
    return(req,res,next)=>{
        if(!req.user){
            return next(new AppError(ERRORS.UNAUTHORIZED))
        }

        if(!allowedRoles.includes(req.user.role)){
            return next(new AppError(ERRORS.FORBIDDEN))
        }
         next()
    }
   
}