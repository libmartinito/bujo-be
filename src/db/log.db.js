import { query } from "./config.js"

const now = new Date().toISOString().split("T").slice(0, 19).join(" ")

export const createLog = async (payload) => {
    const { user_id, type, status, content } = payload
    const sql = "insert into logs (user_id, type, status, content, created_at, updated_at) values ($1, $2, $3, $4, $5, $6)"
    const params = [user_id, type, status, content, now, now]
    await query(sql, params)
}

export const getMonthlyLogs = async (params, query) => {
    const { user_id } = params
    const { year, month } = query
    const sql = "select * from logs where user_id = $1 and extract(year from created_at) = $2 and extract(month from created_at) = $3"
    const params = [user_id, year, month]
    const res = await query(sql, params)
    return res
}

export const getDailyLogs = async (params, query) => {
    const { user_id } = params
    const { year, month, day } = query
    const sql = "select * from logs where user_id = $1 and extract(year from created_at) = $2 and extract(month from created_at) = $3 and extract(day from created_at) = $4"
    const params = [user_id, year, month, day]
    const res = await query(sql, params)
    return res
}

export const updateLogById = async (payload) => {
    const { log_id, data } = payload
    const queryObjs = []
    if (data.type) {
        const sql = "update logs set type = $1, updated_at = $2 where id = $3"
        const params = [data.type, now, log_id]
        sqlStrings.push({ sql, params })
    }
    if (data.status) {
        const sql = "udpate logs set status = $1, updated_at = $2 where id = $3"
        const params = [data.status, now, log_id]
        sqlStrings.push({ sql, params })
    }
    if (data.content) {
        const sql = "update logs set content = $1, updated_at = $2 where id = $3"
        const params = [data.content, now, log_id]
        sqlStrings.push({ sql, params })
    }
    if (data.created_at) {
        const sql = "update logs set content = $1, updated_at = $2 where id = $3"
        const params = [data.created_at, now, log_id]
        sqlStrings.push({ sql, params })
    }
    if (sqlStrings.length !== 0) {
        for (const queryObj of queryObjs) {
            await query(queryObj.sql, queryObj.params)
        }
    }
}

export const deleteLogById = async (payload) => {
    const { log_id } = payload
    const sql = "delete from logs where id = $1"
    const params = [log_id]
    await query(sql, params)
}