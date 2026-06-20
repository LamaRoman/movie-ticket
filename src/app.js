import express from 'express'
import authRouter from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middleware/errorHandler.js'

const app = express();

app.use(express.json())
app.use(cookieParser())

app.get('/test', (req, res) => {
    res.status(200).json({ message: 'server is working' })
})

app.use('/auth',authRouter)
app.use('/user',userRoutes)

app.use(errorHandler)

export default app;

