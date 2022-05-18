import React from 'react'
import './contact_us.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import wa from '../../pict_source/wa.png'
import tw from '../../pict_source/twitter.png'
import ig from '../../pict_source/ig.jpeg'
import lb1 from '../../pict_source/lineblue2.png'



function ContactUs() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <br />
     <div class='container3'>
          <h3>Contact Us</h3>
          <h4> Dede Anjar Permana</h4>
          <h4> Komplek Griya Bandung Asri 1 Blok H 98</h4>
          <h4> dedeanjarpermana@gmail.com</h4>
          
    </div>

    <div class = 'imagebar'>
    <img src={tw} alt=" line blue" />
    </div>
        </>
  )
}

export default ContactUs