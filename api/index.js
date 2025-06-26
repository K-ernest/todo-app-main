const express = require('express');

// express app
const app = express();

// listen for requests


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('./static'));
app.use(express.json())


app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;