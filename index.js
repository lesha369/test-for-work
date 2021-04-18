const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);
app.listen(process.env.APP_API_PORT, () => {
    console.log(`Listen port: ${process.env.APP_API_PORT}`);
})