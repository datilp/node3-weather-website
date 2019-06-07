console.log("This is a javascript log message")

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)  => {
        console.log(data)
    })
})
*/

//const address = 'Boston'

/*
const address = "!"
const url = 'http://localhost:3000/weather?address=' + address

fetch(url).then((response) => {
    response.json().then((data)  => {
        if (data.error) {    
            console.log(data.error)
        } else {
            console.log(data)
        }
        //console.log(data)
    })
})
*/

function fetchWeather(address) {
    // in order to make it compatible for Heroku we make urls relative
    // to current server root
    const url = '/weather?address=' + address
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')
    messageTwo.textContent = "Fetching weather for " + address
    fetch(url).then((response) => {
        response.json().then((data)  => {
            if (data.error) { 
                messageTwo.textContent = data.error
                console.log(data.error)
            } else {
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
            //console.log(data)
        })
    })
}
const weatherForm = document.querySelector("form")

const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevents the page from refreshing
                        // the submit is clicked.
    const location = search.value
    fetchWeather(location)
    //console.log(location)
})
