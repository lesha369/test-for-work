const userGet = require('./user/user-get.js');
const userPost = require('./user/user-post.js');
const userPut = require('./user/user-put.js');
const userLogoutPost = require('./user/user-logout-post.js');
const noteGet = require('./note/note-get.js');
const notePut = require('./note/note-put.js');
const notePost = require('./note/note-post.js');
const noteDelete = require('./note/note-delete.js');

module.exports = {
    userGet,
    userPost,
    userPut,
    userLogoutPost,
    noteGet,
    notePut,
    notePost,
    noteDelete,
};
