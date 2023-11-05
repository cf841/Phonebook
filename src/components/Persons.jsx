const Name = ({ person }) => {
    return (
      <div>
        <li> {person.name} - {person.number}</li>
      </div>
    )
  }

const Persons = ({ persons, deleter }) => {
    return (
      <div>
        <ul>
        {persons.map(person => (
          <div key={person.id}>
            <Name key={person.id} person = {person}/>
            <button onClick={() => deleter(person.id)}> Delete </button>
          </div>  
        ))}
        
      </ul>
      </div>
    )
}

export default Persons