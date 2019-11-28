// Server side javascript that will run on the server
// Core node module
const path = require('path')
const express = require('express')
// For using partials
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Point to public directory
console.log(path.join(__dirname, '../public'))

const app = express()
// Access environment variable; When deployed on Heroku it wll be a default port set by heroku
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// Customize views folder to templates
// __dirname path to the folder this file lives in (src)
const viewsPath = path.join(__dirname, '../templates/views')
// Partials path that the handlebars module needs
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars template engine
// Allows to set a value for a given express setting; key and value
app.set('view engine', 'hbs')

// Only needed if the views are in a custom directory instead of "views" directory
app.set('views', viewsPath)

// Register partials for the handlebars module
hbs.registerPartials(partialsPath)

// Serve up directory
app.use(express.static(publicDirectoryPath))

// app.com is our domain which will run on a single express server
// app.com
// app.com/help
// app.com/about

// What the server should do when someone tries to get the resource at a specific url (ex: send back HTML or JSON)
app.get('', (req, res) => {
    // What to send back to user when this page is hit

    // Render the index view back to requestor
    res.render('index', {
        // Contains all the values you want the view to access;
        // Values to be injected into the template
        title: 'Weather',
        name: 'Mike'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mike'
    })
    /*
    // Will automatically stringify the json object for us and send to browser
    // Can also send [{},{}]
    res.send({
        name: 'Mike',
        age: 28
    })
    */
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mike'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    // If no object is provided, default to null object
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        // If error stop function execution
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
    
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    // requ.query Contains all query string information; { search: 'games', rating: '5' }

     req.send({
         products: []
     })
})

// Handle 404 errors for help subpages; needs to come last
// * = match anything that hasn't been matched so far
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Mike'
    })
})

// Handle 404 errors; needs to come last
// * = match anything that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Mike'
    })
})

// Start up server and have it listen on a specific port
// Usually there are default ports; For HTTP website it is port 80
// Always need to restart server for changes to take effect
app.listen(port, () => {
    // Callback for after server starts
    console.log('Server is up on port ' + port)
})