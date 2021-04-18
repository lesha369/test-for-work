CREATE TABLE testing.users
(
    user_id serial NOT NULL
        CONSTRAINT users_pk
            PRIMARY KEY,
    login VARCHAR(150) NOT NULL,
    password VARCHAR(250) NOT NULL
);

COMMENT ON TABLE testing.users IS 'Пользователи системы';

COMMENT ON COLUMN testing.users.user_id IS 'Идентификатор пользователя';
COMMENT ON COLUMN testing.users.login IS 'Логин пользователя';
COMMENT ON COLUMN testing.users.password IS 'Пароль пользователя';

CREATE UNIQUE INDEX users_login_uindex
    ON testing.users (login);

CREATE TABLE testing.notes
(
    note_id serial NOT NULL
        CONSTRAINT notes_pk
            PRIMARY KEY,
    user_id INTEGER NOT NULL
        CONSTRAINT testing_user_id_fkey
            REFERENCES testing.users
            ON UPDATE CASCADE ON DELETE RESTRICT,
    sharing BOOLEAN DEFAULT FALSE,
    text TEXT,
    create_datetime TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    modify_datetime TIMESTAMP
);

COMMENT ON COLUMN testing.notes.note_id IS 'Идентификатор записи';
COMMENT ON COLUMN testing.notes.user_id IS 'Идентификатор пользователя, создавшего запись';
COMMENT ON COLUMN testing.notes.sharing IS 'Разрешение на просмотр записи для неавторизованных';
COMMENT ON COLUMN testing.notes.text IS 'Содержание записи';

CREATE FUNCTION testing.func_update_modify_datetime_column() RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.modify_datetime = now();
    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION testing.func_update_modify_datetime_column() is 'Автоматическая установка текущей даты в поле со временем изменения записи';

ALTER FUNCTION testing.func_update_modify_datetime_column() OWNER TO postgres;

CREATE TRIGGER trg_update_notes_modify_datetime
    BEFORE UPDATE
    ON testing.notes
    FOR EACH ROW
EXECUTE PROCEDURE testing.func_update_modify_datetime_column();

COMMENT ON TRIGGER trg_update_notes_modify_datetime ON testing.notes IS 'Триггер для обновления даты последнего изменения записи';