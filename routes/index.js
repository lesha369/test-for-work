const methods = require('../core/methods');

const runner = async (method, req, res) => {
    const data = Object.keys(req.query).length && req.query || req.body;
    console.log('<<<<<', data);
    try {
        return await new methods[method]({data, req}, res);
    } catch (error) {
        //console.log('>>>>>>>>>>>>>>>', error);
        const errorData = {msg: 'error', data: error};

        res.status(400).json(errorData);
    }
};

module.exports = (app) => {
    // User info
    app.get('/user', async (req, res) => {
        await runner('userGet', req, res);
    });

    // Auth
    app.post('/user', async (req, res) => {
        await runner('userPost', req, res);
    });

    // Create
    app.put('/user', async (req, res) => {
        await runner('userPut', req, res);
    });

    // Note get
    app.get('/note', async (req, res) => {
        await runner('noteGet', req, res);
    });

    // Note create
    app.put('/note', async (req, res) => {
        await runner('notePut', req, res);
    });

    // Note modify
    app.post('/note', async (req, res) => {
        await runner('notePost', req, res);
    });

    // Note delete
    app.delete('/note', async (req, res) => {
        await runner('noteDelete', req, res);
    });

    app.all('*', (req, res) => {
        res.send({msg: 'error', data: 'method not found'}, 404);
    });
}