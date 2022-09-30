import express from "express"
import * as log from "../controller/log.controller.js"

export const router = express.Router()

router.post("/api/logs", log.createLog)
router.get("/api/logs/:user_id/:year/:month", log.getMonthlyLogs)
router.get("/api/logs/:user_id/:year/:month/:day", log.getDailyLogs)
router.patch("/api/logs/:log_id", log.updateLogById)
router.delete("/api/logs/:log_id", log.deleteLogById)