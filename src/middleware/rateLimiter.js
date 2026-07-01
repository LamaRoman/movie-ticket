import rateLimit from "express-rate-limit";
import {RedisStore} from "rate-limit-redis"
import redis from "../lib/redis.js";

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit : 5,
    skipSuccessfulRequests: true,
    message:{message:'Too many login attempts. Please try again in 10 minutes'},
    store: new RedisStore({
        sendCommand:(...args)=>redis.call(...args),
        prefix:'rl:login',
    })

})