const NumberForm = ({
  handleNameChange,
  handleNumberChange,
  handleSubmit,
  newName,
  newNumber
}) => (
  <form onSubmit={handleSubmit}>
    <div>name: <input value={newName} onChange={handleNameChange} /></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

export default NumberForm