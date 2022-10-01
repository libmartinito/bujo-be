import * as db from "../db/user.db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const oldUser = await db.getUserByEmail(email)
        if (oldUser) {
            res.status(400).send({ message: "User already exists"})
        }
        req.body.password = await bcrypt.hash(password, 8)
        const user = await db.createUser(req.body)
        delete user[password]
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        await db.createToken(user.id, token)
        res.status(200).send({ user, token })
        return
    } catch (err) {
        res.status(500).send(err)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await db.getUserByEmail(email)
        if (!user) {
            res.status(400).send({ message: "User does not exist"})
        }
        const storedPassword = await db.getPassword(email)
        const isPasswordMatch = await bcrypt.compare(password, storedPassword)
        if (!isPasswordMatch) {
            res.status(400).send({ message: "Password does not match"})
        }
        delete user[password]
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        await db.createToken(user.id, token)
        res.status(200).send({ user, token })
        return
    } catch (err) {
        res.status(500).send(err)
    }
}