const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

class AuthController {

    async login(req, res) {
        const result = await this.validate(req.body.password);
        if (result) res.json({ token: result });
        else res.send(401);
    }

    async validate(password) {
        if (await bcrypt.compare(password, config.get('hash')))
            return this.getPayload();
        return null;
    }

    validatePayload(passphrase) {
        return passphrase === "CommitteeAY2019";
    }

    async getPayload() {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            passphrase: "CommitteeAY2019"
        }, 'DudeItsSecret');
    }

}

module.exports = AuthController;