import React, { useEffect, useState } from 'react'
import EditContact from './editContact'


const ListContact = () => {
    
    const [contacts, setContacts] = useState([])

    const deleteContact = async (id) => {
        try {
            const deleteContact = await fetch (`http://localhost:3000/contacts/${id}`, {
                method : "DELETE"
            })

            console.log(deleteContact)
            setContacts(contacts.filter(contact => contact.id !== id))
        } catch (error) {
            console.error(err.message)
        }
    }

    const getContacts = async () => {
        try {
            const res = await fetch ("http://localhost:3000/contacts")
            const dataContacts = await res.json()

            setContacts(dataContacts)
        } catch (error) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getContacts()
    }, [])

  return (
    <>
      {" "}
      <table class="table">
  <thead>
    <tr>
        <th scope="col">No</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Mobile</th>
        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {contacts.map((contact, index) => (
        <tr key={contact.id}>
            <td>{index + 1}</td>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.mobile}</td>
            <td>
                <EditContact contact={contact}/>
                <button className='btn btn-danger m-2' onClick={() => deleteContact(contact.id)}>Delete</button>
            </td>
        </tr>
      ))}
  </tbody>
</table>
    </>
  )
}

export default ListContact
