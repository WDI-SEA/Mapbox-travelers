let express = require('express')
let app = express()
let ejsLayouts = require('express-ejs-layouts')
let methodOverride = require('method-override')

app.use(ejsLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
//links static folder for formatting, add formatting
app.use(express.static("static"))
//add method override middleware
app.use(methodOverride('_method'))


app.get('/', (req, res)=>{
  res.render('home')
})

app.listen(process.env.PORT || 8000, console.log('🎧 Port 8000 🎧'))