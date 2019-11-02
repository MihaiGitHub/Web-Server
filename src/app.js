const express = require('express')

const app = express()

// app.com is our domain which will run on a single express server
// app.com
// app.com/help
// app.com/about

// What the server should do when someone tries to get the resource at a specific url (ex: send back HTML or JSON)
app.get('', (req, res) => {
    // What to send back to user when this page is hit

    // Send something back to requestor
    res.send('Hello Express')
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.get('/weather', (req, res) => {
    res.send('Weather page')
})

// Start up server and have it listen on a specific port
// Usually there are default ports; For HTTP website it is port 80
// Always need to restart server for changes to take effect
app.listen(3000, () => {
    // Callback for after server starts
    console.log('Server is up on port 3000')
})