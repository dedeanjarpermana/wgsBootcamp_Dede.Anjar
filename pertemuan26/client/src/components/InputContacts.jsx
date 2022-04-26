import React, { useState } from 'react'

const InputContacts = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { name, email, mobile}
            const res = await fetch("http://localhost:3000/contacts", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })

            console.log(res)
            window.location = "/"
        } catch (error) {
            console.error(err.message)
        }
    }

    return(
        <>
        <h1 className='text-center mt-3'>Input Data Contacts</h1>
        <form onSubmit={onSubmitForm}>
            <div mb-3>
                <label for="name" className="form-label">Name</label>
                <input 
                    type="name" 
                    className="form-control" 
                    id="name"
                    value={name}
                    onChange = { e => setName(e.target.value)}
                />
            </div>
            <div mb-3 mt-3>
                <label for="email" className="form-label">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    value={email}
                    onChange = {e => setEmail(e.target.value)}
                />
            </div>
            <div mb-3 mt-3>
                <label for="mobile" className="form-label">Mobile</label>
                <input 
                    type="mobile"
                    className="form-control" 
                    id="mobile"
                    value={mobile}
                    onChange = {e => setMobile(e.target.value)}
                />
            </div>
            
            <button className='m-5' type="submit" class="btn btn-primary">Tambah  Contact</button>
        </form>
        </>
    )
}


export default InputContacts  