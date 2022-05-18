import React, { useState } from 'react'

import './add_contacts.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const AddContacts = () => {

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword]  = useState("")
    const [role, setRole] = useState("")
    const [mobile, setMobile] = useState("")
    

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { username, name, email, password, role, mobile}
            const res = await fetch("http://localhost:3500/add_contacts", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })

            console.log(res)
            window.location = "/contacts"
        } catch (error) {
            console.error(err.message)
        }
    }

    return(
        <>
        <Navbar />
        <Sidebar />
      <br />
        <div className='add_contacts'>
        <h1 className='text-center mt-3'>Input New Users</h1>
        <form onSubmit={onSubmitForm}>
            <div className="box-input">
                <div className= "mb-3">
                    <label for="username" className="form-label">UserName</label>
                    <input 
                        type="username" 
                        className="form-control" 
                        id="username"
                        value={username}
                        onChange = { e => setUsername(e.target.value)}
                    />
                </div>
                <div className= "mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input 
                        type="name" 
                        className="form-control" 
                        id="name"
                        value={name}
                        onChange = { e => setName(e.target.value)}
                    />
                </div>
                <div className= "mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        value={email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                </div>
                <div className= "mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        value={password}
                        onChange = {e => setPassword(e.target.value)}
                    />
                </div>

                <div className= "mb-3">
                    <label for="role" className="form-label">Role</label>
                    <input 
                        type="role" 
                        className="form-control" 
                        id="role"
                        value={role}
                        onChange = {e => setRole(e.target.value)}
                    />
                </div>

                <div className= "mb-3">
                    <label for="mobile" className="form-label">Mobile</label>
                    <input 
                        type="mobile"
                        className="form-control" 
                        id="mobile"
                        value={mobile}
                        onChange = {e => setMobile(e.target.value)}
                    />
                </div>
            </div>
            <button className='m-5' type="submit" class="btn btn-primary">Tambah  Contact</button>
        </form>
        </div>
        </>
    )
}


export default AddContacts