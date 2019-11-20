const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'xxxx'

    request({ url, json: true }, (error, { body }) => {
        // Fail at a low level; error argument exists, but response does not
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){ // Fail at request input
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary)
        }
    })

}

module.exports = forecast