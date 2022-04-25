import React from 'react'
import { NavbarBrand } from 'react-bootstrap'
import ReactDOM, { render } from 'react-dom'
import App from './App'
import './index.css'
import Nav from "./nav"
import MainContent from './mainContent'
// import CardCont from './card'
import TextList from './textlist'
import CardContact from './CardContact'
import Increment from "./increment"
function renderDOM(content, id){
  ReactDOM.render(content,document.getElementById(id))
}

renderDOM(<App />, 'root')
renderDOM(<Nav />, "nav")
renderDOM(<MainContent />, "m_content")
renderDOM(<Increment />, 'inc')
renderDOM(<CardContact />, 'card')