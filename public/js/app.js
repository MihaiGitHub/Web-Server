// Client side javascript that will run in the browser
console.log('Client side javascript file loaded')

fetch('http://localhost:3000/weather?address=boston').then((response) => {
    resonpse.json().then((data) => {
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
})