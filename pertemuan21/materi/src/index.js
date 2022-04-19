import React from 'react'
import ReactDOM from 'react-dom'
import Navigasi from './navigasi';
import "./style.css";


import MainContent from "./mainContent" 

import ButtonIncrement from "./buttonincreament"



ReactDOM.render(<MainContent />, document.getElementById("root")) 
ReactDOM.render(<Navigasi/>, document.getElementById("nav"))
ReactDOM.render(<ButtonIncrement/>, document.getElementById("button"))

