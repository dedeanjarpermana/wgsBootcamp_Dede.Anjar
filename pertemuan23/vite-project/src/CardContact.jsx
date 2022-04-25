import React from 'react'
import contacts from './contacts'
import { Card , Button} from 'react-bootstrap'
import './card.css'

const CardContact = () => {
    
    const [listContacts, setContacts] =  React.useState(contacts)
    function handleRemove(id) {
        setContacts(listContacts.filter((item) => item.id !== id))

    }

    const ListContacts = contacts.map((item) => {
        return (
        <div className='card'>
            <Card  border="primary" style={{ width: '18rem' }}>
                <Card.Header>List Contact</Card.Header>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.email}</Card.Text>
                    <Card.Text>{item.noHP}</Card.Text>
                    <Button variant="primary">Update</Button>
                    <Button className='card-btn' variant="danger" onClick={() => handleRemove(item.id)}>Delete</Button>{' '}
                </Card.Body>     
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