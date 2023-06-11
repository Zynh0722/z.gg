const express = require('express');
const app = express();

const favicon = require('serve-favicon')
const path = require('path');

var cron = require('node-cron');


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))
app.use(express.static(__dirname + '/../client/dist'));

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}/`);
});
