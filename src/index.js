const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.set('port', process.env.PORT || 4040)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(require('./routes/index'))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})