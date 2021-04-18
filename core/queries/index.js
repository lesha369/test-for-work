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
            testing.notes
        WHERE
            TRUE
            /*noteId: AND note_id = :noteId*/
            /*userId: AND user_id = :userId*/
            /*sharing: AND sharing = :sharing*/;`,

    createNote: `
        INSERT INTO testing.notes
            (
                 user_id
                ,text
                /*sharing: ,sharing*/
            )
        VALUES
            (
                 :userId
                ,:text
                /*sharing: ,:sharing*/
            )
        RETURNING
             note_id AS "noteId"
            ,user_id AS "userId"
            ,sharing
            ,text;`,

    modifyNote: `
        UPDATE
            testing.notes
        SET
             modify_datetime = NOW()
            /*sharing: ,sharing = :sharing*/
            /*text: ,text = :text*/
        WHERE
            user_id = :userId
            AND note_id = :noteId
        RETURNING
             note_id AS "noteId"
            ,user_id AS "userId"
            ,sharing
            ,text;`,

    deleteNote: `
        DELETE FROM
            testing.notes
        WHERE
              note_id = :noteId
              AND user_id = :userId
        RETURNING
             note_id AS "noteId"
            ,user_id AS "userId"
            ,sharing
            ,text;`,
};
