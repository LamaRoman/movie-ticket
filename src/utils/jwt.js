import jwt from 'jsonwebtoken'

export function generateAccessToken(user) {
    return jwt.sign({ id: user.id, role:user.role }, 
        process.env.JWT_SECRET_ACCESSKEY, 
        { expiresIn: '15m' })
}

export function verifyAccessToken(token){
    return jwt.verify(token,process.env.JWT_SECRET_ACCESSKEY)
}

export function generateRefreshToken(user){
    return jwt.sign({id:user.id,role:user.role},
        process.env.JWT_SECRET_REFRESHKEY,
        {expiresIn:'7d'})
}

export function verifyRefreshToken(token){
    return jwt.verify(token,process.env.JWT_SECRET_REFRESHKEY)
}