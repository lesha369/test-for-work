const {noteId, text, sharing} = require('../schema-properties.js');

module.exports = {
    id: 'notePost',
    type: 'object',
    additionalProperties: false,
    required: ['noteId'],
    properties: {noteId, text, sharing},
};
