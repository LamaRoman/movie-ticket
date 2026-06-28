
const validate = (schema)=>(req,res,next)=>{
    
    const validated = schema.safeParse(req.body)
    
    if(!validated.success){
        return res.status(400).json({errors:validated.error.flatten()})
    }
    req.body = validated.data;
    next()

}


export default validate;