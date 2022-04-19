import React from 'react';

const navigasi = () => {
    
        const date = new Date();
        return(
        <div className="navbar"> 
        <div className="kiri">
        BOOTCAMP Batch 1 : Experiment with REACT JS
    
        </div>



<div className="kanan">

    <ul>
        <li> Home </li>
        <li> About </li>
        <li> Contact</li>
        <li>
        {date.toLocaleTimeString()}
      </li>
        
    </ul>
</div>

</div>
)
}

export default navigasi; 