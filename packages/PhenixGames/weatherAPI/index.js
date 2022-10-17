const debug = require('../../../_assets/json/debug/debug.json').weatherapi;
const axios = require('axios');
const console = require('better-console');
const weatherData = require('./weather.json');

module.exports.setWeather = async function () {
    axios
        .get(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=Los_Angeles&aqi=no`
        )
        .then((res) => {
            /**
             * {
                "location": {
                    "name": "Los Angeles",
                    "region": "California",
                    "country": "United States of America",
                    "lat": 34.05,
                    "lon": -118.24,
                    "tz_id": "America/Los_Angeles",
                    "localtime_epoch": 1645979112,
                    "localtime": "2022-02-27 8:25"
                },
                "current": {
                    "temp_c": 11.7,
                    "is_day": 1,
                    "condition": {
                        "text": "Sunny",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png"
                    },
                    "wind_kph": 0.0,
                    "cloud": 0,
                    "feelslike_c": 11.4,
                    "vis_km": 16.0,
                    "uv": 4.0,
                    "gust_kph": 13.0
                }
            }
             */

            if (res.status === 200) {
                let currentDate = new Date();

                mp.world.time.set(
                    currentDate.getHours(),
                    currentDate.getMinutes(),
                    currentDate.getSeconds()
                );

                for (const [index, [key, value]] of Object.entries(Object.entries(weatherData))) {
                    if (res.data.current.condition.text.indexOf(value) !== -1) {
                        //Wetter ist schon das gleiche
                        if (mp.world.weather === key) return;

                        return (mp.world.weather = key);
                    }
                }
            } else {
                return false;
            }
        })
        .catch((err) => {
            console.error(`WeatherAPI Error: ${err.toString()}`);
            return false;
        });
};
