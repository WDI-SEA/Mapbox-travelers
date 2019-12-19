let express = require('express')
let app = express()
let ejsLayouts = require('express-ejs-layouts')

app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));
//add method override middleware

app.get('/', (req, res)=>{
  res.render('home')
})

app.listen(process.env.PORT || 8000, console.log('🎧 Port 8000 🎧'))