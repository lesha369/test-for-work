module.exports = {

    getUser: `
        SELECT
             user_id AS "userId"
            ,login
        FROM
             testing.users
        WHERE
            TRUE
            /*login: AND login = :login*/
            /*password: AND password = :password*/
            /*userId: AND user_id = :userId*/;`,

    createUser: `
        INSERT INTO testing.users
            (user_id, login, password)
        VALUES
            (
                 DEFAULT
                ,:login
                ,:password
            )
        RETURNING
             user_id AS "userId"
            ,login;`,

    getNotes: `
        SELECT
             note_id AS "noteId"
            ,user_id AS "userId"
            ,sharing
            ,text
        FROM
            notes
        WHERE
            TRUE
            /*noteId: AND note_id = :noteId*/
            /*userId: AND user_id = :userId*/
            /*sharing: AND sharing = :sharing*/;`,
};
