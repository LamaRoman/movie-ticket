export const ERRORS = {
    
    // auth errors
    USER_NOT_FOUND: {status:401,message:'User not found'},
    USER_ALREADY_EXISTS:{status:409,message:'Email already exists'},
    INVALID_CREDENTIALS:{status:401,message:'Invalid email or password'},
    MISSING_FIELDS:{status:400,message:'All fields are required'},
    UNAUTHORIZED:{status:401,message:'Unauthorized, no token provided'},
    INVALID_TOKEN:{status:401,message:'Invalid or expired token'},

    //server errors
    INTERNAL_SERVER_ERROR:{status:500,message:"Internal server error"},

    // multer errors
    FILE_TOO_LARGE: {status:400, message:'File size must be under 5MB'},
    TOO_MANY_FILES:{status:400,message:'Too many files uploaded'},
    UNEXPECTED_FIELD:{status:400,message:'Unexpected file field'},
    NO_FILE_UPLOADED:{status:400,message:'No file uploaded'},

}