const request = require('request')

const geocode = (address, callback) => {
    const token = "pk.eyJ1IjoicGlzdGFjaG8iLCJhIjoiY2p3Y3llcDJnMDYzZzN5cGl5bXFpOTNqaiJ9.Y5ok2WUlDC7KcWe0aaE-CA"
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + token + '&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body == null || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode