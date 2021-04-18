const jwt = require('jsonwebtoken');
const MethodInterface = require('../method-interface.js');
const validateSchema = require('../../schemas/note/note-delete.js');

class NoteDelete extends MethodInterface {
    /**
     * API method
     * @param {Object} data Request data
     */
    async run(data) {
        this.checkAuthorization();
        this.validateParams(data, validateSchema);

        const accessToken = this.request.headers.authorization;
        const {userId} = accessToken && jwt.decode(accessToken) || {};

        const pool = await this.getPool();
        const result = await this.dbQuery(pool, 'deleteNote', {...data, userId}, {
            unlock: true,
            returnType: 'row',
            notFoundMsg: 'Note not found',
        });

        this.send(result, 200);
    }
}

module.exports = NoteDelete;
