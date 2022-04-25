import React, { useEffect, useState } from 'react'


function Conf(props){
    return <h1>Hello, {props.name}</h1>;
    const [contacts, setContacts] = useState([])
    const loadContact = () => {
        axios.get('http://localhost:3000/contacts')
        .then((res) => {
          setContacts(res.data)
          console.log(contacts)
        })
    
      };
      useEffect(() => {
        loadContact()
      },[])

      return (
        <div className="Conf">
          <h1> Good Morning {props.name} </h1> // Good Morning Jenifer
        </div>
      );
}

export default Conf