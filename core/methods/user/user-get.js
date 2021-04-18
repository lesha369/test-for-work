const MethodInterface = require('../method-interface.js');

class UserGet extends MethodInterface {
    /**
     * API method
     * @param {Object} data Request data
     */
    async run(data) {
        const pool = await this.getPool();
        const result = await this.dbQuery(pool, 'getUser', data, {unlock: true});

        this.send(result, 200);
    }
}

module.exports = UserGet;
