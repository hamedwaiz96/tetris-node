const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

app.listen(port, () => console.log('Server Started!'))