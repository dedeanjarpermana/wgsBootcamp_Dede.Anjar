import React, { useState } from 'react'

import './add_barang.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'


const AddBarang= () => {

    const [id_barang, setIdbarang] = useState("")
    const [nama_barang, setNamabarang] = useState("")
    const [jumlah_barang, setJumlahbarang] = useState("")
    const [harga_barang, setHargabarang]  = useState("")
    const [photo, setPhoto] = useState("")
    const [id_penginput, setIdpenginput] = useState("")
   
    

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { id_barang, nama_barang, jumlah_barang, harga_barang, photo, id_penginput}
            const res = await fetch("http://localhost:3500/list_barang", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })

            console.log(res)
            window.location = "/list_barang"
        } catch (error) {
            console.error(err.message)
        }
    }

    return(
        <>
        <Navbar />
        <Sidebar />
      <br />
        <div className='add_barang'>
            
        <h1 className='text-center mt-3'>Input New Barang</h1>
        <form onSubmit={onSubmitForm}>
            <div className="box-input">
                <div className= "mb-3">
                    <label for="id_barang" className="form-label">Id Barang</label>
                    <input 
                        type="id_barang" 
                        className="form-control" 
                        id="id_barang"
                        value={id_barang}
                        onChange = { e => setIdbarang(e.target.value)}
                    />
                </div>
                <div className= "mb-3">
                    <label for="nama_barang" className="form-label">Nama Barang</label>
                    <input 
                        type="nama_barang" 
                        className="form-control" 
                        id="nama_barang"
                        value={nama_barang}
                        onChange = { e => setNamabarang(e.target.value)}
                    />
                </div>
                <div className= "mb-3">
                    <label for="jumlah_barang" className="form-label">Jumlah barang</label>
                    <input 
                        type="jumlah_barang" 
                        className="form-control" 
                        id="jumlah_barang"
                        value={jumlah_barang}
                        onChange = {e => setJumlahbarang(e.target.value)}
                    />
                </div>
                <div className= "mb-3">
                    <label for="harga_barang" className="form-label">Harga Barang</label>
                    <input 
                        type="harga_barang" 
                        className="form-control" 
                        id="harga_barang"
                        value={harga_barang}
                        onChange = {e => setHargabarang(e.target.value)}
                    />
                </div>

                <div className= "mb-3">
                    <label for="photo" className="form-label">Photo</label>
                    <input 
                        type="photo" 
                        className="form-control" 
                        id="photo"
                        value={photo}
                        onChange = {e => setPhoto(e.target.value)}
                    />
                </div>

                <div className= "mb-3">
                    <label for="id_penginput" className="form-label">Id Penginput</label>
                    <input 
                        type="id_penginput" 
                        className="form-control" 
                        id="id_penginput"
                        value={id_penginput}
                        onChange = {e => setIdpenginput(e.target.value)}
                    />
                </div>

                
            </div>
            <button className='m-5' type="submit" class="btn btn-primary">Tambah  Barang</button>
        </form>
        </div>

        </>
    )
}


export default AddBarang