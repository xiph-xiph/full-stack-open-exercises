import axios from 'axios' 

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getCoords = (location) => {
  return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`)
}

const getWeather = (coords) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`)
}

export default {
  getCoords,
  getWeather
}