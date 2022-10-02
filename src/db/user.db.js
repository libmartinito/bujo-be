import { query } from "./config.js"

export const getUserByEmail = async (email) => {
    const sql = "select * from users where email = $1"
    const params = [email]
    const res = await query(sql, params)
    return res
}

const now = new Date().toISOString().slice(0, 19).split('T').join(' ')

export const createUser = async (payload) => {
    const { email, password } = payload
    const sql = "insert into users (email, password, created_at, updated_at) values ($1, $2, $3, $4)"
    const params = [email, password, now, now]
    await query(sql, params)
    const user = await getUserByEmail(email)
    return user
}

export const createToken = async (id, token) => {
    const sql = "insert into tokens (user_id, token, created_at, updated_at) values ($1, $2, $3, $4)"
    const params = [id, token, now, now]
    await query(sql, params)
}

export const getPassword = async (email) => {
    const sql = "select password from users where email = $1"
    const params = [email]
    const res = await query(sql, params)
    return res.password
}

export const getUserTokens = async (id) => {
    const sql = "select token from users where user_id = $1"
    const params = [id]
    const res = await query(sql, params)
    return res
}