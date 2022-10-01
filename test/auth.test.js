import { afterAll, describe, it, expect, beforeEach } from "vitest"
import { app } from "../server.js"
import supertest from "supertest"
import { query } from "../src/db/config"

let req = supertest(app)

const payload = {
    email: "lib.martinito@pm.me",
    password: "password"
}

const clearDB = async () => {
    const sql = "truncate tokens, users cascade"
    await query(sql)
}

afterAll(async () => {
    await clearDB()
})

describe("/api/user/register", () => {
    it("should return user info and a token", async () => {
        const res = await req.post("/api/user/register").send(payload)
        payload.token = res.body.token
        expect(res.status).toBe(200)
        expect(res.body.user.email).toEqual(payload.email)
        expect(res.body.user.password).toBeUndefined()
        expect(res.body.token).toBeDefined()
    })
    it("should return an error when registering with an email that exists", async () => {
        const res = await req.post("/api/user/register").send(payload)
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("User already exists")
    })
})

describe("/api/user/login", () => {
    it("should return user info and token", async () => {
        const res = await req.post("/api/user/login").send(payload)
        expect(res.status).toBe(200)
        expect(res.body.user.email).toEqual(payload.email)
        expect(res.body.user.password).toBeUndefined()
        expect(res.body.token).toBeDefined()
    })
    it("should return an error if password does not match", async () => {
        const res = await req.post("/api/user/login").send({
            email: "lib.martinito@pm.me",
            password: "wrong password"
        })
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("Password does not match")
    })
    it("should return an error if email does not exist", async () => {
        await clearDB()
        const res = await req.post("/api/user/login").send(payload)
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual("User does not exist")
    })
})