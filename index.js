const apiKey = 'b811634d40e2473990a162218241101'

const locationInput = document.getElementById('location-input')
const temperatureButton = document.getElementsByClassName('temperature-button')[0]

let isFarenheit = true

locationInput.addEventListener('input', (event) => {
    displayInformation(locationInput.value)
});

temperatureButton.addEventListener('click', (event) => {
    if(temperatureButton.innerHTML === 'F°') {
        temperatureButton.innerHTML = 'C°'
        isFarenheit = false
        displayInformation(locationInput.value)
    } else {
        temperatureButton.innerHTML = 'F°'
        isFarenheit = true
        displayInformation(locationInput.value)
    }
});

async function getData(location) {
    try {
        return (await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`, {"mode":"cors"})).json()
    } catch(err) {
        console.log(err)
    }
}

async function getInformation(location) {
    try {
        const response = await getData(location);
        return {
            "name": response.location.name,
            "region": response.location.region,
            "weather": response.current.condition.text,
            "icon": response.current.condition.icon,
            "tempCelcius": response.current.temp_c,
            "tempFarenheit": response.current.temp_f
        }
    } catch(err) {
        console.log(err)
    }
}

async function displayInformation(location) {
    try {
        const information = await getInformation(location)

        const nameAndRegion = document.getElementsByClassName('name-and-region')[0]
        const weatherDescription = document.getElementsByClassName('weather-description')[0]
        const icon = document.getElementsByClassName('icon')[0]
        const temperature = document.getElementsByClassName('temperature')[0]

        nameAndRegion.innerHTML = `${information.name}, ${information.region}`
        weatherDescription.innerHTML = information.weather
        icon.src = information.icon

        if(isFarenheit) {
            temperature.innerHTML = `${information.tempFarenheit}F`
        } else {
            temperature.innerHTML = `${information.tempCelcius}C`
        }
    } catch(err) {
        const nameAndRegion = document.getElementsByClassName('name-and-region')[0]
        const weatherDescription = document.getElementsByClassName('weather-description')[0]
        const icon = document.getElementsByClassName('icon')[0]
        const temperature = document.getElementsByClassName('temperature')[0]

        if(locationInput.value.length !== 0) {
            nameAndRegion.innerHTML = 'Nothing matches that name!'
        }
        else {
            nameAndRegion.innerHTML = ''
        }
        weatherDescription.innerHTML = ''
        icon.src = ''
        temperature.innerHTML = ''
        
    }
}
