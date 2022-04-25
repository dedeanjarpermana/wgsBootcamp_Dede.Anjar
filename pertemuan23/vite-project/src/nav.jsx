import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Navbar, NavbarBrand, Nav} from 'react-bootstrap'
const nav = () => {
    
        const date = new Date();
        return(
            
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Menu</Navbar.Brand>
                <Navbar.Brand href="#home">Contact</Navbar.Brand>
                <Navbar.Brand href="#home">Edit</Navbar.Brand>
                <Navbar.Brand href="#home"> {date.toLocaleTimeString()}</Navbar.Brand>

                </Container>
            </Navbar>
            
            
        )}



export default nav