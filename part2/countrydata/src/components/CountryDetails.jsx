const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <img src={country.flags.png}></img>
      <div>Capital: {country.capital}</div>
      <div>Region: {country.region}</div>
      <div>Subregion: {country.subregion}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => <li key={key}>{language}</li>)}
      </ul>
    </>
  )
}

export default CountryDetails