import { useState } from 'react'
import React from 'react'
import logo from './logo.svg'
import './App.css'
import InputContacts from './components/inputContacts'
import ListContact from "./components/ListContact";

function App() {

  return (
    <>
    <div className="container">
      <InputContacts />
      <ListContact />
    </div>
    </>      
  )
}

export default App
