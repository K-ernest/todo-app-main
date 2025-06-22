const express = require('express');
const cookieParser = require('cookie-parser');

// express app
const app = express();

// listen for requests
app.listen(8080);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('static'));
app.use(cookieParser())
app.use(express.json())


app.get('/', (req, res) => {
  res.render('index');
});

