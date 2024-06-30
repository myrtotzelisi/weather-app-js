const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput')
const card = document.querySelector('.card')
const apiKey = "youAPIkey"

weatherForm.addEventListener('submit', async event => {
 event.preventDefault();
 const city = cityInput.value;
if(city) {
    try {
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData)
    }
    catch(error){
        console.log(error);
        displayError(error);
    }

}
else {
    displayError('Please enter a city')
}

});

async function getWeatherData(city) {
    const apiUrl=`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data")
    }
    return await response.json();
}

function displayWeatherInfo(data) {
     const {
        location: {name},
        current: {
            temp_c: temp,
            condition: {icon, text}, 
            humidity
    } 
}= data
    card.textContent='';
    card.style.display='flex'

    // create 
    const cityDisplay= document.createElement('h1'); 
    const tempDisplay= document.createElement('p'); 
    const humidityDisplay= document.createElement('p'); 
    const descDisplay= document.createElement('p'); 
    const weatherEmoji= document.createElement('img'); 

    //what is it going to display?
    cityDisplay.textContent= name;
    tempDisplay.textContent = temp;
    humidityDisplay.textContent= `Humidity: ${humidity}` ;
    descDisplay.textContent =text;
    weatherEmoji.src =(icon);

    //give it style
    cityDisplay.classList.add('cityDisplay')
    tempDisplay.classList.add('tempDisplay')
    humidityDisplay.classList.add('humiidityDisplay')
    descDisplay.classList.add('descDisplay')
    weatherEmoji.classList.add('weatherEmoji')

    // append
    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)

}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay")

    card.textContent='';
    card.style.display='flex'
    card.appendChild(errorDisplay)
}