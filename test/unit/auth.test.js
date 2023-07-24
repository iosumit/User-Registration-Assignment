const { CONFIG, Config } = require("../../config")
const jwt = require('jsonwebtoken')
const auth = require('../../server/utils/authorization.token')

describe("authorization.token", () => {

    it("Should Return JWT", () => {

        const payload = {
            id: 1,
            first_name: "result.first_name",
            last_name: "result.last_name",
            created_at: "result.created_at",
            username: "result.username"
        }

        const token = auth.createToken(payload);
        const decoded = jwt.verify(token, Config.JWT_AUTH_TOKEN_SECRET);
        expect(decoded).toMatchObject(payload);
    })
})