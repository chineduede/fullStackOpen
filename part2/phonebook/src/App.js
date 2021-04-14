import React, { useState , useEffect } from 'react'

// components
import { Person, Search, Form, Notification, ErrorMsg } from "./components/components";
import personService from './services/services';


const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);
  const [ notif, setNotif ] = useState('');
  const [ error, setError ] = useState('');

  const hook = () => {
    personService
      .getAll()
        .then(personsReturned => {
        setPersons(personsReturned)
      });
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault();
    let identity = persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase());
    if (identity) {
      let choice = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if (choice) {
        personService
          .update(identity.id, {...identity, number: newNumber})
          .then(returnedPerson => {
           setPersons( persons.map(person => person.name !== returnedPerson.name ? person : returnedPerson));
           personService
            .showMessage(setNotif,`${returnedPerson.name}'s number has been changed.` , 3000)
          })
          .catch(error => {
            personService
              .showMessage(setError, `Information of ${identity.name} has already been removed from the server`, 3000 )
          })
      }
    } else {
      let newPerson = {
        name: newName,
        number: newNumber
      };
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          personService
            .showMessage(setNotif,`Added ${returnedPerson.name}`,3000 )
        })
    }
    setNewName('');
    setNewNumber('');


  };

  const deletePerson = id => {
    let individual = persons.filter(person => person.id === id).map(person => person.name)[0]
    let choice = window.confirm(`Delete ${individual}?`);
    if (choice) {
      personService
        .deleteID(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id));
          personService
            .showMessage(setNotif, `Deleted ${individual} from the server`, 3000)
        })
        .catch(error => console.log(error))
    }
  }

  const logName = (event) => {
    setNewName(event.target.value)
  }

  const logNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filterName = (event) => {
    let keyword = event.target.value.toLowerCase();
    let filtered = persons.filter(person => Object.values(person)[0].toLowerCase().includes(keyword))
    setFilteredPersons(filtered);
  };

  const filterOrNot = (filteredPersons.length === 0) ? persons : filteredPersons;

  return (
    <div>
      <h2>Phonebook</h2>
       { notif ? <Notification message={notif} /> : (error) ? <ErrorMsg message={error} /> : ''}
        <Search handleClick={filterName} text="filter shown with:" />
      <h1>add a new</h1>
        <Form handleClick={[addName, logName, logNumber]} values={[newName, newNumber]} />
      <h2>Numbers</h2>
        {filterOrNot.map(person =>
          <Person key={person.id} name={person.name} number={person.number} handleClick={() => deletePerson(person.id)}/>
        )}
    </div>
  )
} 

export default App




