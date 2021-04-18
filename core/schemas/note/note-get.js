const {noteId, userId} = require('../schema-properties.js');

module.exports = {
    id: 'noteGet',
    type: 'object',
    additionalProperties: false,
    properties: {noteId, userId},
};
