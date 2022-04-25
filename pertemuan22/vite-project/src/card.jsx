import React from 'react'
import contacts from './contacts'
import { Card, card } from 'react-bootstrap'


export const card = () => {
    const ListContact = contacts.map(item) => {
        return (
            <div className = 'card'>
                <Card border = "primary" style={{ width: 18rem}}
                
                
            </div>
        )
    }
    
}
