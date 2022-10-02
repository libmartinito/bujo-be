import jwt from "jsonwebtoken"
import * as db from "../db/user.db.js"

export const auth = async (req, res, next) => {
    try {
        let token = req.header("Authorization")
        if (!token) {
            throw new Error()
        }
        token = token.replace("Bearer ", "")
        const secret = process.env.JWT_SECRET
        const { id } = jwt.verify(token, secret)
        const tokens = await db.getUserTokens(id)
        if (!tokens) {
            throw new Error()
        }
        if (!tokens.includes(token)) {
            throw new Error()
        }
        next()
    } catch (err) {
        res.status(400).send({ message: "Please authenticate"})
    }
}