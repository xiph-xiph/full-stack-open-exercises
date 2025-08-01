import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryDetails = ({ country }) => {

  const [capitalCoords, setCapitalCoords] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState(null)

  const convertTemp = (tempInKelvin) => (tempInKelvin - 273.15).toFixed(1)

  useEffect(() => {
    weatherService.getCoords(country.capital)
      .then((response) => {
        setCapitalCoords({ lat: response.data[0].lat, lon: response.data[0].lon })
        return weatherService.getWeather(response.data[0])
      })
      .then((response) => {
        console.log(response)
        setWeatherInfo(response.data)
      })
  }, [country])


  return (
    <>
      <h1>{country.name.common}</h1>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
      <div>Capital: {country.capital}</div>
      {capitalCoords && (
        <div>Coordinates: {capitalCoords.lat}, {capitalCoords.lon}</div>
      )}
      <div>Region: {country.region}</div>
      <div>Subregion: {country.subregion}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => <li key={key}>{language}</li>)}
      </ul>
      {weatherInfo && (
        <>
          <h2>Current weather in {country.capital}</h2>
          <div>Temperature: {convertTemp(weatherInfo.main.temp)}°C (feels like {convertTemp(weatherInfo.main.feels_like)}°C)</div>
          <div>Humidity: {weatherInfo.main.humidity}%</div>
          <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={weatherInfo.weather[0].description}></img>
          <div>Wind: {weatherInfo.wind.speed} m/s</div>
        </>
      )}
    </>
  )
}

export default CountryDetails