const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(layouts);

app.get('/', (req, res) => {
    res.render('home');
});

// Controllers
app.use('/', require('./routes/cities'))

app.listen(8000);