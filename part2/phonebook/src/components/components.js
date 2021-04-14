// import react from 'react';

const Person = ({ name, number, handleClick }) => <p>{name} {number} <button onClick={handleClick}>Delete</button></p>;

const Search = ({ handleClick, text }) => <p>{text} <input onChange={handleClick} /></p>;

const Element = ({ handleClick, value}) => <div><input value={value} onChange={handleClick} /></div>

const Form = ({ handleClick, values , text}) => {

    const [addName, logName, logNumber] = handleClick;
    const [newName, newNumber] = values;

    return (
        <form onSubmit={addName}>
            name: <Element handleClick={logName} value={newName} />
            number: <Element handleClick={logNumber} value={newNumber} />
            <div><button type="submit">add</button></div>
       </form>
    )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

const Notification = ({ message }) => {

    return (
      <div className="success">
        {message}
      </div>
    )
}

const ErrorMsg = ({ message }) => {

    return (
      <div className="error">
        {message}
      </div>
    )
}



export { Person, Search, Element, Form, Notification, ErrorMsg }

