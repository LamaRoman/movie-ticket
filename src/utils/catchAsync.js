export function catchAsync(fn){
    return (req,res,next)=>{
        fn(req,res,next).catch((error)=>{
            if(req.rateLimit){
                error.remainingAttempts = req.rateLimit.remaining
            }
            next(error)
        })
    }
}