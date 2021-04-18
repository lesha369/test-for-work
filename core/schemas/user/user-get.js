const {login, userId} = require('../schema-properties.js');

module.exports = {
    id: 'userPut',
    type: 'object',
    additionalProperties: false,
    properties: {login, userId},
};
