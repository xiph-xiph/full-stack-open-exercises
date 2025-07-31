const PersonList = ({ persons, handleDelete }) => (
  persons.map((person) =>
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>)
)

export default PersonList