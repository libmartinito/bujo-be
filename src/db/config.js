import pkg from "pg"
const { Client } = pkg
import dotenv from "dotenv"

dotenv.config()

const client = new Client(process.env.DATABASE_URL)
client.connect()

export const query = async (sql, params) => {
    try {
        const res = await client.query(sql, params)
        return res.rows[0]
    } catch (err) {
        console.log(err)
    }
}