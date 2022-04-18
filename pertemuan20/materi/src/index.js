import React from 'react'
import ReactDOM from 'react-dom'
import "./style.css";


const navigasi = 
<div className="navbar">

    <div className="kiri">
        BOOTCAMP Batch 1 : Experiment with REACT JS
    </div>

    <div className="kanan">
        
        <ul> 
            <li> Home </li>
            <li> About </li>
            <li> Contact</li>
        </ul>
    </div>

</div>;

ReactDOM.render(navigasi, document.getElementById('nav'))

const element = <h1> this is React</h1>;
ReactDOM.render(element, document.getElementById('root'))


