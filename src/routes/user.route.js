import express from "express"
import * as user from "../controller/user.controller.js"

export const router = express.Router()

router.post('/api/user/register', user.register)
router.post('/api/user/login', user.login)