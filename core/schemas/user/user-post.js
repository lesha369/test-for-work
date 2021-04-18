const {login, password} = require('../schema-properties.js');

module.exports = {
    id: 'userPost',
    type: 'object',
    additionalProperties: false,
    required: ['login', 'password'],
    properties: {login, password},
};
