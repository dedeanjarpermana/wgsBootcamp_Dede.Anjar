import React from 'react'
import contacts from './contacts'
import { Card , Button} from 'react-bootstrap'
import './card.css'

const CardContact = () => {
    const sayHello = () => alert("Hello World!");
    const ListContacts = contacts.map((item) => {
        return (
        <div className='card'>
            <Card  border="primary" style={{ width: '18rem' }}>
                <Card.Header>List Contact</Card.Header>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.email}</Card.Text>
                    <Card.Text>{item.noHP}</Card.Text>
                </Card.Body>
                <Button variant="danger">Delete</Button>
                <Button variant="primary" onclick="sayHello()" >Update</Button>
            </Card>
            
            
        </div>

        )
        
    })
    return (
    <div>
        
        <p>{ListContacts}</p>
    </div>
  )
}

export default CardContact