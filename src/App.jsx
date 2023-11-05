import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import axios from 'axios'
import Notification  from './components/Error'
import nameService from './services/names'
import PeopleForm from './components/PeopleForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id:1, number: "01010101010"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    nameService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
  
    if (persons.some(person => person.name === newName)) {
      const Object = {
        name: newName,
        id: (persons.find(person => person.name === newName)).id,
        number: newNumber
      }
      nameService.update(Object.id, Object).then(res => {
        const updated = persons.filter(person => person.id !== Object.id)
        setPersons(updated.concat(res.data))
        setNewName('')
        setNewNumber('')
      })
    } else {
      console.log(persons.length)
      const nameObject = {
        name: newName,
        id: persons.reduce((max, person) => (person.id > max ? person.id : max)) + 1,
        number: newNumber
      }
      nameService.create(nameObject)
           .then(response => {
             setPersons(persons.concat(response.data))
             setNewName('')
             setNewNumber('')
           })

      setErrorMessage(`Added ${nameObject.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deleter = (event) => {
    console.log(event)
    nameService.deleteName(event).catch(error => {
      setErrorMessage("This user has already been deleted")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setPersons(persons.filter(n => n.id !== event))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <PeopleForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName} />
      <h2>Numbers</h2>
      <Persons persons={persons} deleter={deleter}/>
    </div>
  )
}

export default App