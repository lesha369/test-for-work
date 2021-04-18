const {text, sharing} = require('../schema-properties.js');

module.exports = {
    id: 'notePut',
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {sharing, text},
};
