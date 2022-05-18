import React, {useState, useEffect} from 'react'
import './dashboard.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import tw from '../../pict_source/twitter.png'
// import { report } from '../../../../server/routes/auth'
// import ReportDashboard from '../../pages/ReportDashboard'

function Dashboard() {
  
  const [userAmount, setUserAmount] = useState('')
  const sumUser = async () => {
    const sum = await fetch('http://localhost:3500/contacts')
    const sumData = await sum.json()

    let amount = []
    for (var i=0; i<sumData.length; i++){
      var results = sumData[i]
      amount.push(results)
    }
    // console.log(amount.length)
    setUserAmount(amount.length)
  }
  useEffect(() => {
    sumUser()
  }, [])

  const [totalbarang, setBarangSum] = useState('')
  const GetTotalBarang = async () => {
    
    const sum = await fetch('http://localhost:3500/total')
    const TotalBarang = await sum.json()
    console.log(sum)
    console.log(TotalBarang.totalbarang)

    

  
  setBarangSum(TotalBarang.totalbarang)
  
  }
  useEffect(() => {
    GetTotalBarang()
  }, [])

  const [barangAmount, setBarangAmount] = useState('')
  const sumBarang = async () => {
    const sum = await fetch('http://localhost:3500/list_barang')
    const sumBarang = await sum.json()

    let amount = []
    for (var i=0; i<sumBarang.length; i++){
      var results = sumBarang[i]
      amount.push(results)
    }
    // console.log(amount.length)
    setBarangAmount(amount.length)
  }
  useEffect(() => {
    sumBarang()
  }, [])


  return (
    <>
      <Navbar />
      <Sidebar />
      
      <br />
      <nav className = "report_dashboard">
        <div id="kiri"> Jumlah user:  {userAmount} </div>
        <div id="kanan"> Jumlah item Barang: {barangAmount} </div>
        <div id="kanan"> Jumlah seluruh Barang: {}</div>

        
      </nav>
      
        
        
       
        
     
      <div class= "container1" >
          <h1>WGS is the main company for IT Business, which lead the bussiness for the highest services </h1>
      </div>

      <div class= "container2" >
          <h2> Our priority is to make the world dynamic with IT achievement </h2>
      </div>
      <div className='imagebar'>
      <img src={tw} alt=" instagram" />
      </div>
    </>
  )
}

export default Dashboard
