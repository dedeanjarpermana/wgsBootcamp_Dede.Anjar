import React from 'react'
import './sidebar.css'

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <header>
            {/* <h6>WGS INVENTORY BARANG</h6> */}
        </header>
        <ul>
            <li><a href="/"><i className="fas fa-laptop"></i>Dashboard</a></li>
            <li><a href="/contacts"><i className="fas fa-users"></i>Users</a></li>
            <li><a href="/list_barang"><i className="fa-thin fa-list "></i>List Barang</a></li>
            {/* <li><a href="#"><i className="far fa-calendar-alt"></i>Calendar</a></li> */}
            <li><a href="#"><i className="fas fa-chart-line"></i>Report</a></li>
            <li><a href="/contact_us"><i className="fas fa-id-card"></i>Contact Us</a></li>
            <li><a href="#"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
            
        </ul>
    </div>
    </>
  )
}

export default Sidebar
