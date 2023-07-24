const request = require('supertest')
const { User } = require('../../server/models');
const { Op } = require("sequelize");

let server;
let payload;
describe("/user", () => {

    beforeEach(() => { server = require('../../index') })
    afterEach(async () => {
        server.close();
        if (payload) {
            let whereClause = {
                [Op.and]: {
                    username: payload.username,
                    email: payload.email
                }
            }
            await User.destroy({
                where: whereClause
            })
        }
    })

    describe('/login', () => {
        it('should return error when password not found', async () => {
            const res = await request(server).post('/user/login')
                .send({
                    "email": "test@testcase.com"
                })
            expect(res.statusCode).toBe(502)
            expect(res.body).toHaveProperty('message')
        })

        it('should return error when email not found', async () => {
            const res = await request(server).post('/user/login')
                .send({
                    "password": "1222"
                })
            expect(res.statusCode).toBe(502)
            expect(res.body).toHaveProperty('message')
        })

        it('should return user detail with token on login', async () => {

            payload = {
                username: "testcase",
                first_name: "testcase",
                last_name: "testcase",
                email: "test@testcase.com",
                password: "1234"
            };
            await User.create(payload)
            const res = await request(server).post('/user/login')
                .send({
                    "email": payload.email,
                    "password": payload.password
                })

            expect(res.statusCode).toBe(200)
            expect(res.body.data).not.toBeNull()
            expect(res.body.data).toHaveProperty('token')
            expect(res.body.data).toHaveProperty('user')
            expect(res.body.data.user).toHaveProperty('id')
            expect(res.body.data.user.username).toBe(payload.username)
        })
    })
})