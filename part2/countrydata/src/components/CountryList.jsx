import CountryDetails from './CountryDetails'

const CountryList = ({ countryData }) => {

  if (countryData === null) {
    return (
      <div>Loading countries...</div>
    )
  }

  if (countryData.length > 10) {
    return (
      <div>Too many matches, please specify your filter</div>
    )
  }

  if (countryData.length === 0) {
    return (
      <div>No country matches the filter</div>
    )
  }

  if (countryData.length > 1) {
    return (
      countryData.map((country) => <div key={country.id}>{country.name.common}</div>)
    )
  }

  return <CountryDetails country={countryData[0]} />
}


export default CountryList