const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

app.listen(port, () => console.log('Server Started!'))