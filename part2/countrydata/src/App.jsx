import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import CountryView from './components/CountryView'

function App() {
  const [filterValue, setFilterValue] = useState('')
  const [countryData, setCountryData] = useState(null)
  
  const filteredCountryData = countryData ? countryData.filter((country) => {
    return country.name.common.toLowerCase().includes(filterValue.toLowerCase())
  }) : null

  useEffect(() => {
    countryService
      .getAll()
      .then((response) => {
        setCountryData(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <>
      <Filter handleFilterChange={handleFilterChange} />
      <CountryView countryData={filteredCountryData} />
    </>
  )
}

export default App
