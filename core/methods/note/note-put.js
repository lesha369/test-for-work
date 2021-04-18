const jwt = require('jsonwebtoken');
const MethodInterface = require('../method-interface.js');
const validateSchema = require('../../schemas/note/note-put.js');

class NotePut extends MethodInterface {
    /**
     * API method
     * @param {Object} data Request data
     */
    async run(data) {
        this.checkAuthorization();
        data.sharing = data.sharing && JSON.parse(data.sharing) || false;
        this.validateParams(data, validateSchema);

        const accessToken = this.request.headers.authorization;
        const {userId} = accessToken && jwt.decode(accessToken) || {};

        const pool = await this.getPool();
        const result = await this.dbQuery(pool, 'createNote', {...data, userId}, {
            unlock: true,
            returnType: 'row',
        });

        this.send(result, 200);
    }
}

module.exports = NotePut;
