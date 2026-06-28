import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit : 5,
    skipSuccessfulRequests: true,
    message:{message:'Too many login attempts. Please try again in 10 minutes'}
})