const jst = require('mobitel-json-schema-template');

module.exports = {
    login: jst.string().min(1).max(200).done(),
    password: jst.string().min(1).max(200).done(),
    userId: jst.string().min(1).done(),
    noteId: jst.string().min(1).done(),
    sharing: jst.boolean(),
    text: jst.string().min(1).max(1000).done(),
};
