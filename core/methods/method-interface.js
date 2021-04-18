const {Pool} = require('pg');
const ZSchema = require('z-schema');
const validator = new ZSchema();
const jwt = require('jsonwebtoken');
const queries = require('../queries');
const {getPreparedQuery} = require('../../scripts.js');
const {db} = require('../../config.js');

/** @class */
class MethodInterface {
    /**
     * Class constructor
     * @param {Object} dataRequest Request params
     * @param {Object} dataRequest.data Http request body
     * @param {Object} dataRequest.req Http request data
     * @param {Object} res Http response data
     */
    constructor({data, req}, res) {
        this.response = res;
        this.request = req;
        this.run(data);
    }

    get schema() {
        return require(`../schemas/user/${this.constructor.name}`)
    }

    /**
     * Send response
     * @param {Object} data Response data
     * @param {Object} statusCode Response status code
     */
    send(data, statusCode = true) {
        try {
            const msg = statusCode === 200 ? 'success' : 'error';
            const result = {msg, data};

            this.response.status(statusCode).json(result);

            console.log('<<<', JSON.stringify(result));

            return result;
        } catch (e) {
            return e;
        }
    }

    /**
     * DB query
     * @param {Object} pool Db pool
     * @param {Object} queryName Query name
     * @param {Object|Boolean} params Params object
     * @param {Object|Boolean} props Sql props
     * @param {Object|Boolean} props.returnType Sql result row or rows
     * @param {Object|Boolean} props.unlock Exec parse sql query
     * @param {Object|Boolean} props.notFoundMsg Msg if not found
     */
    async dbQuery(pool, queryName, params = false, {returnType, unlock, notFoundMsg, ...props} = {}) {
        try {
            const text = unlock ? getPreparedQuery(queries[queryName], params).toString() : queries[queryName];

            const result =  await pool.query({
                rowMode: 'object',
                text,
            });
            await pool.end();
            if (notFoundMsg && !result.rows.length) {
                throw new Error(notFoundMsg);
            }
            if (returnType) {
                return returnType === 'row' && result.rows[0] || result.rows;
            }
            return result.rows;
        } catch (error) {
            this.send(error.message, 400);
        }
    }

    /**
     * Get DB pool
     * @return {Object} pool Db pool
     */
    getPool() {
        const pool = new Pool(db);
        return pool.connect();
    }

    /**
     * Validation
     * @param {Object} data Request data
     * @param {Object|Boolean} schema Schema
     */
    validateParams(data, schema = this.schema) {
        if (!validator.validate(data, schema)) {
            //console.log(validator.getLastErrors());
            this.send(validator.getLastErrors()[0].message, 400);
            throw Error('Invalid validate');
        }
    }

    /**
     * Check JWT authorization
     * @param {Object} accessToken Request data
     */
    checkAuthorization(accessToken) {
        if (!this.request.headers.authorization) {
            this.send('Access forbidden', 403)
            throw Error('Not authorized');
        }
        jwt.verify(this.request.headers.authorization,
            process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                this.send(err.message, 403);
                throw Error(err);
            }
            /*console.log('<<<<<<<<<', payload)
            console.log('>>>>>>>>>>>>', Math.round(new Date().getTime() / 1000))*/
        });
    }
}

module.exports = MethodInterface;
