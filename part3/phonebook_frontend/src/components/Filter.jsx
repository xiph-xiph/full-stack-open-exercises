const Filter = ({
  nameFilter,
  handleFilterChange
}) => (
  <div>filter: <input value={nameFilter} onChange={handleFilterChange} /></div>
)

export default Filter