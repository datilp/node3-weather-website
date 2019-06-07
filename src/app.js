// cd web-server
// npm init -y
// npm i express@4.16.4
// note: updated npm 
//      sudo npm install -g npm

const express = require('express') // express is a function

console.log(__dirname) // shows path to the current directory
console.log(__filename) // shows path to this file

//nodejs has a function has a function call path
const path = require('path')

console.log(path.join(__dirname, "/../public/index.html")) // the .. actually removes
// the previous directory from the path
const publicDirectoryPath = path.join(__dirname, "/../public")

const  app =  express() // express doesn't take any arguments instead
// it gets configured using methods

const hbs = require('hbs')

app.set('view engine', 'hbs') // this tells scriptjs to run the view engine,
// template files ... 
// by default it will look for it in the /public/views folder
// Now the static rendering of the index.html will get superseeded by this.
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)
app.set('views', viewPath)
app.use(express.static(publicDirectoryPath))

// Say we have a number of domains
// app.com
// app.com/help
// app.com/about
// how do we route these?
// with app.get()
// the first argument is where we want to go
// '' root
// help is /help
// about is /about
// the anomymous function is what it is return, the content.
// which takes to arguments the request and the response. We can use
// several methods on the response to send stuff back
// now this get call get supersedded by the above app.use call
/*
app.get('', (req, res) => {
    res.send('Hello express!')
})
*/ // we rescue this code again but use the method render instead
// also the index.html file needs to be remove for scriptjs to pick
// the template hbs file
app.get('', (req, res) => {
    // we can pass a second argument to render that will be used
    // to populate the template
    res.render('index', {
        title: 'Weather App',
        name: 'Igor Sola'
    }
    )
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        helpText: "Here is the help message",
        name: "Igor Sola"
    })
})


app.get('/about', (req, res) => {
    //res.send('<h1>About page</h1>') //no need for the static page
    res.render('about', {
        title: "About:",
        name: "Igor Sola"
    })
})

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            'error': 'Address must be provided'
        })       
    }
    //To avoid
    // TypeError: Cannot destructure property `latitude` of 'undefined' or 'null'.
    // we default the { latitude, longitude, location } to an empty object {} this 
    // will default everything to undefined
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                'error': error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    'error': error
                })
            }
            res.send({
                'address': req.query.address,
                'location': location,
                'forecast': forecastData
            })
            //console.log(location)
            //console.log(forecastData)
        })
    })

 
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error Page",
        errorMessage: "Article not found under help",
        name:"Igor Sola"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error Page",
        'errorMessage': '404 page not found',
        name:"Igor Sola"
    })
})

// to start the server simply run
// node src/app.js
// however changes done to this file won't be picked up, unless we ctrl-c
// instead we can use:
// nodemon src/app.js
// which will pick up changes in the app.js file

port_no = 3000
app.listen(port_no, () => {
    console.log('Server is upon port ' + port_no)
})