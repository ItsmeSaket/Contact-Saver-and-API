const express = require('express')
const exphbs = require('express-handlebars')
const members = require('./Members')

const app = express()

// Handlebars Middlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(__dirname + "/public/"))

// Homepage
app.get('/', (req, res) => {
    res.render('index', {
    title: 'Add Contact Id\'s ',
    members
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
    title: 'About Us'
    })
})

// Members api routes
app.use('/api/members', require('./routes/api/members'))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})