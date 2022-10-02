import express from "express"
import * as log from "../controller/log.controller.js"
import { auth } from "../middleware/auth.js"

export const router = express.Router()

router.post("/api/logs", auth, log.createLog)
router.get("/api/logs/:user_id/:year/:month", auth, log.getMonthlyLogs)
router.get("/api/logs/:user_id/:year/:month/:day", auth, log.getDailyLogs)
router.patch("/api/logs/:log_id", auth, log.updateLogById)
router.delete("/api/logs/:log_id", auth, log.deleteLogById)