const jwt = require('jsonwebtoken');
const MethodInterface = require('../method-interface.js');
const validateSchema = require('../../schemas/note/note-post.js');

class NotePost extends MethodInterface {
    /**
     * API method
     * @param {Object} data Request data
     */
    async run(data) {
        this.checkAuthorization();
        data = {
            ...data,
            ...data.sharing && {sharing: JSON.parse(data.sharing)},
        };

        this.validateParams(data, validateSchema);
        this.checkParams(data);

        const accessToken = this.request.headers.authorization;
        const {userId} = accessToken && jwt.decode(accessToken) || {};

        const pool = await this.getPool();
        const result = await this.dbQuery(pool, 'modifyNote', {...data, userId}, {
            unlock: true,
            returnType: 'row',
            notFoundMsg: 'Note not found',
        });

        this.send(result, 200);
    }

    /**
     * Check require optional params
     */
    checkParams({noteId, ..._data}) {
        if (!Object.keys(_data).length) {
            throw Error('Insert one of or more optional params');
        }
    }
}

module.exports = NotePost;
