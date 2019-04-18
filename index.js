let express = require('express')
let app = express()
let ejsLayouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(express.static("static"));
app.use('/', require('./controllers/cities'))

app.get('/', (req, res)=>{
  res.render('home')
})

app.listen(process.env.PORT || 8000, console.log('🎧 Port 8000 🎧'))