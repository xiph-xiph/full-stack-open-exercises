import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

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
      <CountryList countryData={filteredCountryData} />
    </>
  )
}

export default App
