import { login, register } from "../services/auth.service.js";
import { generateAccessToken,verifyAccessToken } from "../utils/jwt.js";

const cookieOptions = {
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge: 7 *24 *60 * 60 *1000
        }
export async function registerUser(req, res) {
    const { name, email,password } = req.body;

    try {
        const user = await register({ name, email,password })
        const accessToken= generateAccessToken(user)

        // store it so it lives across requests
        res.cookie('accessToken',accessToken,cookieOptions)
        res.status(201).json({user})
    } catch (error) {
        next(error)
    }

}

export async function loginUser(req, res,next) {
    const { email, password } = req.body
    try {
        const user = await login({ email, password })
        const accessToken = generateAccessToken(user)

        res.cookie('accessToken',accessToken,cookieOptions)
        res.status(200).json({user})

    } catch (error) {
        next(error)
    }
}