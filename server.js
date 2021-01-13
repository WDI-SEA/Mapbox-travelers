// Requirements
let express = require('express');
let ejsLayouts = require('express-ejs-layouts');

// Environmental setup
const PORT = process.env.PORT || 8000;

// App setup
let app = express();

// Middleware
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res)=>{
  res.render('home');
});

app.get('/*', (req, res) => res.render('404'));

// Server init
app.listen(PORT, console.log(`🎧 Listening at Port: ${PORT} 🎧`));