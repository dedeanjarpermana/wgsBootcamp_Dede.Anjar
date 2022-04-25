import React from 'react'
import contacts from './contacts'
import { Card, card } from 'react-bootstrap'
import './card.css'


const CardCont = () => {
    const ListContact = contacts.map((item) => {
        return (
            <div className = 'card'>
                <Card  border="primary" style={{ width: '20rem' }}>
                <Card.Header>List Contact</Card.Header>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.email}</Card.Text>
                    <Card.Text>{item.noHP}</Card.Text>
                </Card.Body>
            </Card> 
            </div>
        )
    })
    return (
        <div>
            <p>{ListContact}</p>
        </div>
      )
    
    
}
export default CardCont