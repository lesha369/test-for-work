module.exports = {
    db: {
        host: process.env.DB_PG_HOST,
        port: process.env.DB_PG_PORT,
        user: process.env.DB_PG_USER,
        password: process.env.DB_PG_PASSWORD,
        database: process.env.DB_PG_DATABASE,
    }
};
