import { verifyAccessToken } from "../utils/jwt.js"

export function authenticate(req,res,next){
    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({status:'fail',message:'Token does not exist'})
    }

    try{
        const decoded = verifyAccessToken(token)
        req.user = decoded
        next()
    }catch(error){
        res.status(401).json({message:"Invalid token"})
    }
    
}