import { login, register, refresh } from "../services/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";
import {loginLimiter} from "../middleware/rateLimiter.js"
const accessTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
}

const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export async function refreshToken(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            throw new AppError("No refresh token", 401)
        }
        const accessToken = await refresh(refreshToken)
        res.cookie("accessToken", accessToken, accessTokenCookieOptions)
        res.status(200).json({ message: "Token refreshed" })
    } catch (error) {
        next(error)
    }
}

export async function registerUser(req, res, next) {
    const { name, email, password } = req.body;
    try {
        const { user, accessToken, refreshToken } = await register({ name, email, password })
        res.cookie('accessToken', accessToken, accessTokenCookieOptions)
        res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
        res.status(201).json({ user })
    } catch (error) {
        next(error)
    }
}

export const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const { user, accessToken, refreshToken } = await login({ email, password })
    res.cookie('accessToken', accessToken, accessTokenCookieOptions)
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
    res.status(200).json({ user })
})

export async function logoutUser(req, res, next) {
    const { id } = req.user
    try {
        await logout(id)
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        next(error)
    }
}