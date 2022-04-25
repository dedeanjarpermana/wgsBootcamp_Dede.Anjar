import React from 'react';
const list = [{data:'tags1'}, {data:'tags2'}, {data:'tags3'}, {data:'tags4'},]

// untuk mengeluarkan array
export default function App(){
    const listData = list.map((item)=>{
        return <p> {item.data}</p>
    })
    return(
        <div>
            <p> {listData}</p>
        </div>
    )
}
