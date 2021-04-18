const MethodInterface = require('../method-interface.js');
const crypto = require('crypto');
const validateSchema = require('../../schemas/user/user-put.js');

class UserPut extends MethodInterface {
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
        const result = await this.dbQuery(pool, 'createUser', {login, password}, {
            unlock: true,
            returnType: 'row',
        });

        this.send(result, 200);
    }
}

module.exports = UserPut;
