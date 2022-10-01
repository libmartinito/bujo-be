import express from "express"
import dotenv from "dotenv"
import { router as userRouter } from "./src/routes/user.route.js"
import { router as logRouter } from "./src/routes/log.route.js"

dotenv.config()

export const app = express()

app.use(express.json())
app.use(userRouter)
app.use(logRouter)