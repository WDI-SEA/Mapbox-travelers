require('dotenv').config()
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')

let app = express()

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));

app.use('/cities', require('./routes/cities'))

app.get('/', (req, res)=>{
  res.render('home')
})

app.use('/', require('./routes/cities'))


app.listen(process.env.PORT || 8000, console.log('🎧 Port 8000 🎧'))
