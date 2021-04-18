const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const MethodInterface = require('../method-interface.js');

class UserPost extends MethodInterface {
    /**
     * API method
     * @param {Object} data Request data
     * @param {String} data.login User login
     * @param {String} data.password User password
     */
    async run(data) {
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

        this.send(result, 200);
    }
}

module.exports = UserPost;
