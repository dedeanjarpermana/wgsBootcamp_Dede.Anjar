import React, { useEffect, useState } from 'react'
import './listcontact.css'
import InputContacts  from '../add_contacts/add_contacts'
import { NavLink } from 'react-router-dom'
import EditContact from '../edit_user/editUser'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'


const ListContact = () => {
    
    const [contacts, setContacts] = useState([])

    const deleteContact = async (username) => {
        try {
            const deleteContact = await fetch (`http://localhost:3500/contacts/${username}`, {
                method : "DELETE"
            })

            console.log(deleteContact)
            setContacts(contacts.filter(contact => contact.username !== username))
        } catch (error) {
            console.error(error.message)
        }
    }

    const getContacts = async () => {
        try {
            const res = await fetch ("http://localhost:3500/contacts")
            const dataContacts = await res.json()

            setContacts(dataContacts)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getContacts()
    }, [])

  return (
    <>
        <Navbar />
        <Sidebar />
      <br />
   
      {" "}
      <h3> Data Users </h3>
      <NavLink to='/add_contacts'>
      <button> Add User </button>
      </NavLink>
            
            
    
      <table class="table">
     
  <thead>
      
    <tr>
        <th scope="col">No</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Mobile</th>
        <th scope="col">Role</th>
        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {contacts.map((contact, index) => (
        <tr key={contact.username}>
            <td>{index + 1}</td>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.mobile}</td>
            <td>{contact.role}</td>
            <td>
                <EditContact contact={contact}/>
                {/* <NavLink to='/edit_user'>
                <button> Edit </button>
                </NavLink> */}
                <button className='btn btn-danger m-2' onClick={() => deleteContact(contact.username)}>Delete</button>
            </td>
        </tr>
      ))}
  </tbody>
</table>

    
    </>
  )
}

export default ListContact
