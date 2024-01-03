const apiKey = "911284c8fde2688b17fed3cce50a28af"
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const cardShow = document.querySelector(".weather")
async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").innerHTML = "Invalid city name"
        document.querySelector(".error").style.display = "block"
        cardShow.style.display = "none"
    } else {
        var data = await response.json()
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr"

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
        cardShow.style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}
searchButton.addEventListener('click', function () {
    if (searchBox.value.length > 0) {
        checkWeather(searchBox.value)
        searchBox.value = ""
    } else {
        document.querySelector(".error").innerHTML = "Enter a city name"
        document.querySelector(".error").style.display = "block"
        cardShow.style.display = "none"
    }
})