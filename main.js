// API Key
var apiKey = '&appid=0f66c5dd5a50ff1f618cdde3c17b7f7e';

// DOM Elements
var inputEl = document.querySelector('#cityInput');
var searchBtnEl = document.querySelector('.search-button');
var citiesListEl = document.querySelector("#cities-list");
var cityHistory = [];

// Event Listener for search button
searchBtnEl.addEventListener("click", storeCity);

// Store City Function, sets the input value in localStorage
function storeCity(event) {
    event.preventDefault();
    if (cityHistory.includes(inputEl.value) === false) {
        cityHistory.push(inputEl.value);
        localStorage.setItem('cityNameStore', JSON.stringify(cityHistory));
        historyList();
    };
    getWeather(inputEl.value);
};

function historyList() {
    var storeData = JSON.parse(localStorage.getItem('cityNameStore'));
    if (storeData) {
        cityHistory = storeData;
        citiesListEl.textContent = "";
        for (let i = 0; i < cityHistory.length; i++) {
            let newListItem = document.createElement('li');
            newListItem.textContent = cityHistory[i];
            citiesListEl.appendChild(newListItem);
        }
    }
}
historyList();


function getWeather(cityName) {
    var URLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&units=metric' + apiKey;

    // URL for 5-days forecast 
    var URLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=metric' + apiKey;


    // Current Day Forecast function
    $.ajax({
        url: URLWeather,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            // Display Current weather
            $(".city").html("<h2>" + response.name + "</h2>");
            $(".weather-icon").html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
            $(".humidity").text("Humidity: " + response.main.humidity + "%");
            $(".temperature").text("Temperature: " + Math.round(response.main.temp) + " °C");
            $(".wind").text("Wind: " + ((response.wind.speed) * 2.23694 * 1.60934).toFixed(0) + " km/h");
        });

    // Displays the date
    var currentDay = moment().format("dddd, MMMM Do");

    function functionDay() {
        $(".current-date").text(currentDay);
    };
    functionDay();

    // 5 Days Forecast function
    $.ajax({
        url: URLForecast,
        method: "GET"
    })
        .then(function (response) {

            var dayOne = moment(response.list[0].dt_txt).format("ddd, MMM D");
            $(".day-one-temperature").text("Temp: " + Math.round(response.list[0].main.temp) + "°C");
            $(".day-one-date").html("<h6>" + dayOne + "</h6>");
            $(".day-one-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $(".day-one-humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            $(".day-one-wind").text("Wind: " + response.list[0].wind.speed * (2.23694 * 1.60934).toFixed(0) + " km/h");

            var dayTwo = moment(response.list[8].dt_txt).format("ddd, MMM D");
            $(".day-two-temperature").text("Temp: " + Math.round(response.list[8].main.temp) + "°C");
            $(".day-two-date").html("<h6>" + dayTwo + "</h6>");
            $(".day-two-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $(".day-two-humidity").text("Humidity: " + response.list[8].main.humidity + "%");
            $(".day-two-wind").text("Wind: " + response.list[0].wind.speed * (2.23694 * 1.60934).toFixed(0) + " km/h");

            var dayThree = moment(response.list[16].dt_txt).format("ddd, MMM D");
            $(".day-three-temperature").text("Temp: " + Math.round(response.list[16].main.temp) + "°C");
            $(".day-three-date").html("<h6>" + dayThree + "</h6>");
            $(".day-three-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $(".day-three-humidity").text("Humidity: " + response.list[16].main.humidity + "%");
            $(".day-three-wind").text("Wind: " + response.list[0].wind.speed * (2.23694 * 1.60934).toFixed(0) + " km/h");

            var dayFour = moment(response.list[24].dt_txt).format("ddd, MMM D");
            $(".day-four-temperature").text("Temp: " + Math.round(response.list[24].main.temp) + "°C");
            $(".day-four-date").html("<h6>" + dayFour + "</h6>");
            $(".day-four-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $(".day-four-humidity").text("Humidity: " + response.list[24].main.humidity + "%");
            $(".day-four-wind").text("Wind: " + response.list[0].wind.speed * (2.23694 * 1.60934).toFixed(0) + " km/h");

            var dayFive = moment(response.list[32].dt_txt).format("ddd, MMM D");
            $(".day-five-temperature").text("Temp: " + Math.round(response.list[32].main.temp) + "°C");
            $(".day-five-date").html("<h6>" + dayFive + "</h6>");
            $(".day-five-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
            $(".day-five-humidity").text("Humidity: " + response.list[32].main.humidity + "%");
            $(".day-five-wind").text("Wind: " + response.list[0].wind.speed * (2.23694 * 1.60934).toFixed(0) + " km/h");
        });
};

