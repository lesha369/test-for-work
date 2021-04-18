DROP TABLE IF EXISTS testing.notes;
DROP TABLE IF EXISTS testing.users;

DROP INDEX IF EXISTS users_login_uindex;
DROP TRIGGER IF EXISTS trg_update_notes_modify_datetime ON testing.notes;

DROP FUNCTION IF EXISTS testing.func_update_modify_datetime_column();