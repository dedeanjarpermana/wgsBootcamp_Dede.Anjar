import React from 'react'
import './navbar.css'
import text_wgs from '../../pict_source/text_wgs.png'
import logo from '../../pict_source/logo_wgs.gif'
import logo2 from '../../pict_source/logo2.png'


function Navbar() {
  return (
    <>
  
        <div class="header">
          <div className="gambar">
            {/* <img src={logo} alt="PT. WGS Bandung" /> */}
            <img src={logo2} alt=" WGS (Walden Global Service) Bandung" />
            
            <h3>WGS BOOTCAMP 2022</h3>
          </div>
        </div>

        <input type="checkbox" id="cek" />
          <label for="cek">
            <i class="fas fa-arrow-right" id="btn"></i>
            <i class="fas fa-arrow-left" id="close"></i>
          </label>
        </>
  )
}

export default Navbar