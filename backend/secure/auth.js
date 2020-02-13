const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

class AuthController {

    async login(req, res) {
        const result = await validate(req.body.password);
        if (result) res.json({ token: await result });
        else res.sendStatus(401);
    }

    validatePayload(passphrase) {
        return passphrase === "CommitteeAY2019";
    }

}

async function validate(password) {
    if (await bcrypt.compare(password, config.get('hash')))
        return getPayload();
    return null;
}

async function getPayload() {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        passphrase: "CommitteeAY2019"
    }, 'DudeItsSecret');
}

module.exports = AuthController;