const methods = require('../core/methods');

const runner = async (method, req, res) => {
    const data = Object.keys(req.query).length && req.query || req.body;
    console.log('<<<<<', data);
    try {
        return await new methods[method]({data, req}, res);
    } catch (error) {
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


    app.all('*', (req, res) => {
        res.send({msg: 'error', data: 'method not found'}, 404);
    });
}