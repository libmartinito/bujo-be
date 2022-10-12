import * as db from "../db/log.db.js"

export const createLog = async (req, res) => {
    try {
        await db.createLog(req.body)
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getMonthlyLogs = async (req, res) => {
    try {
        const payload = { ...req.params, ...req.query }
        const res = await db.getMonthlyLogs(payload)
        res.status(200).send(res)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getDailyLogs = async (req, res) => {
    try {
        const payload = { ...req.params, ...req.query }
        const res = await db.getDailyLogs(payload)
        res.status(200).send(res)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const updateLogById = async (req, res) => {
    try {
        const data = req.body
        const { log_id } = req.params
        await db.updateLogById({ log_id, data })
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
}

export const deleteLogById = async (req, res) => {
    try {
        await db.deleteLogById(req.params)
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
}