const {noteId} = require('../schema-properties.js');

module.exports = {
    id: 'noteDelete',
    type: 'object',
    additionalProperties: false,
    required: ['noteId'],
    properties: {noteId},
};
