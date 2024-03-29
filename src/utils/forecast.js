const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const token="663c8dd7b016775dfaa4a55e30c032dd"
    const url = 'https://api.darksky.net/forecast/' + token + '/' + latitude + ',' + longitude
    //console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +
             ' degress out. Highest temperature will be ' + 
             body.daily.data[0].temperatureHigh + ', the lowest: ' 
             + body.daily.data[0].temperatureLow + 
             ' . There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast