import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import Contacts  from './pages/contacts/contacts'
import Login from './pages/login/login'
import View_Contact from './components/view_contact/ListContact'
import ContactUs from './pages/contact_us/contact_us'
import { BrowserRouter, Navigate, Routes, Route , Outlet} from 'react-router-dom'
import AddContacts from './components/add_contacts/add_contacts'
import ListBarang from './components/view_barang/ListBarang'
import AddBarang from './components/add_barang/add_barang'
import EditContact from './components/edit_user/editUser'


// const PrivateRoutes = () => {
//   const { isAuth } = useSelector(state => state.auth)
 
//   return (
//     <>
//       {isAuth ? <Outlet /> : <Navigate to='/login' />}
//     </>
//   ) 
// }

// const RestrictedRoutes = () => {
//   const { isAuth } = useSelector(state => state.auth)

//   return (
//     <>
//       {!isAuth ? <Outlet /> : <Navigate to='/' />}
//     </>
//   ) 
// }



function App() {

  return (
    <>
      
  
      <BrowserRouter>
      <Routes>
        <Route path='/login'>
          <Route index element={<Login/>} />
        </Route>
        <Route path='/'>
          <Route index element={<Dashboard/>} />
        </Route>
        <Route path='/contacts'>
          <Route index element={<View_Contact/>} />
        </Route>
        
        <Route path='/contact_us'>
          <Route index element={<ContactUs/>} />
        </Route>

        <Route path='/list_barang'>
          <Route index element={<ListBarang/>} />
        </Route>

        <Route path='/add_contacts'>
          <Route index element={<AddContacts/>} />
        </Route>

       

        <Route path='/add_barang'>
          <Route index element={<AddBarang/>} />
        </Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
