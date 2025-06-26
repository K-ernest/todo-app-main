const express = require('express');
const path = require('path')

// express app
const app = express();

// listen for requests
// app.listen(8080);

// register view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'))

// middleware & static files
app.use(express.static(path.join(__dirname, '../static')));
app.use(express.json())


app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;