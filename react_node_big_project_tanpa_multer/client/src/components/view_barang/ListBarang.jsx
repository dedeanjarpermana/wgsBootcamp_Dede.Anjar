import React, { useEffect, useState } from 'react'
import './listbarang.css'
import InputContacts  from '../add_contacts/add_contacts'
import { NavLink } from 'react-router-dom'
import EditBarang from '../edit_barang/editBarang'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'


const ListBarang = () => {
    
    const [barangs, setBarangs] = useState([])

    const deleteBarang = async (id_barang) => {
        try {
            const deleteBarang = await fetch (`http://localhost:3500/list_barang/${id_barang}`, {
                method : "DELETE"
            })

            console.log(deleteBarang)
            setBarangs(barangs.filter(barang => barang.id_barang !== id_barang))
        } catch (error) {
            console.error(error.message)
        }
    }

    const getBarangs = async () => {
        try {
            const res = await fetch ("http://localhost:3500/list_barang")
            const dataBarangs = await res.json()

            setBarangs(dataBarangs)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getBarangs()
    }, [])

  return (
    <>
        <Navbar />
        <Sidebar />
      <br />
   
      {" "}
      <h3> Data Barang </h3>
      <NavLink to='/add_barang'>
      <button> Add Barang </button>
      </NavLink>
            
            
    
      <table class="table">
     
  <thead>
      
    <tr>
        <th scope="col">No</th>
        <th scope="col">Id Barang</th>
        <th scope="col">Nama Barang</th>
        <th scope="col">Jumlah Barang</th>
        <th scope="col">Harga Barang</th>
        <th scope="col">Id Penginput</th>
        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {barangs.map((barang, index) => (
        <tr key={barang.id_barang}>
            <td>{index + 1}</td>
            <td>{barang.id_barang}</td>
            <td>{barang.nama_barang}</td>
            <td>{barang.jumlah_barang}</td>
            <td>{barang.harga_barang}</td>
            <td>{barang.id_penginput}</td>
            <td>
                <EditBarang barang={barang}/>
                <button className='btn btn-danger m-2' onClick={() => deleteBarang(barang.id_barang)}>Delete</button>
            </td>
        </tr>
      ))}
  </tbody>
</table>

    
    </>
  )
}

export default ListBarang
