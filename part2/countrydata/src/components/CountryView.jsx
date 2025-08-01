import { useState } from 'react'

import CountryDetails from './CountryDetails'
import CountryList from './CountryList'

const CountryView = ({ countryData }) => {

  const [forceShowCountry, setForceShowCountry] = useState(null)

  if (forceShowCountry !== null) {
    return (
      <>
        <CountryDetails country={forceShowCountry} />
        <button onClick={() => setForceShowCountry(null)}>Go back</button>
      </>
    )
  }

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
      <CountryList countryData={countryData} handleClickShow={setForceShowCountry} />
    )
  }

  return <CountryDetails country={countryData[0]} />
}


export default CountryView