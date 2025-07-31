const PersonList = ({persons}) => (
  persons.map((person) => <div key={person.id}>{person.name} {person.number}</div>)
)

export default PersonList