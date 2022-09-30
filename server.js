import express from "express"
import dotenv from "dotenv"
import { router as userRouter } from "./src/routes/user.route.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(userRouter)

const port = process.env.port

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})