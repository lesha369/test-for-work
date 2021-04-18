const jwt = require('jsonwebtoken');
const MethodInterface = require('../method-interface.js');
const validateSchema = require('../../schemas/note/note-get.js');

class NoteGet extends MethodInterface {
    /**
     * API method
     * @param {Object} data Request data
     */
    async run(data) {
        this.validateParams(data, validateSchema);

        const pool = await this.getPool();
        const result = await this.dbQuery(pool, 'getNotes', data, {
            unlock: true,
            returnType: 'rows',
        });

        const accessToken = this.request.headers.authorization;
        accessToken && this.checkAuthorization();
        const payload = accessToken && jwt.decode(accessToken) || {};
        const isMe = Number(data.userId) === payload.userId;

        const notes = !isMe && result.filter(({sharing}) => sharing === true) || result;

        this.send(notes, 200);
    }
}

module.exports = NoteGet;
