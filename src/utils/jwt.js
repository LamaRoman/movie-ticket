import jwt from 'jsonwebtoken'

export function generateAccessToken(user) {
    return jwt.sign({ id: user.id }, 
        process.env.JWT_SECRET_ACCESSKEY, 
        { expiresIn: '7d' })
}

export function verifyAccessToken(token){
    return jwt.verify(token,process.env.JWT_SECRET_ACCESSKEY)
}