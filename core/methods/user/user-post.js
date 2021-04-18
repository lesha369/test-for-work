const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const MethodInterface = require('../method-interface.js');
const validateSchema = require('../../schemas/user/user-post.js');

class UserPost extends MethodInterface {
    /**
     * API method
     * @param {Object} data Request data
     * @param {String} data.login User login
     * @param {String} data.password User password
     */
    async run(data) {
        this.validateParams(data, validateSchema);

        const {login, password: _password} = data;
        const password = crypto
            .createHash('md5')
            .update(_password)
            .digest("hex");

        const pool = await this.getPool();
        const result = await this.dbQuery(pool, 'getUser', {login, password}, {
            unlock: true,
            notFoundMsg: 'Incorrect data',
            returnType: 'row',
        });

        result.accessToken = result && jwt.sign(result, process.env.JWT_SECRET, {expiresIn: '1m'});

        this.send(result, 200);
    }
}

module.exports = UserPost;
