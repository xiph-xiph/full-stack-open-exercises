const CountryList = ({countryData, handleClickShow}) => {
  return (
    <div>
      {countryData.map((country) => (
        <div key={country.name.common} >{country.name.common} <button onClick={() => handleClickShow(country)}>show</button></div>
      ))
      }
    </div>
  )
}

export default CountryList