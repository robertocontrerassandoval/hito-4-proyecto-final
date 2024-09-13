import React from 'react'
import NavbarInicio from '../components/NavbarInicio'
import { Container,Row, Col, Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const Inicio = () => {
  return (

   <>
   <Container className="container-inicio d-flex flex-column justify-content-space-around">
     
     
     <Container className='container-navbar-inicio'>
          <NavbarInicio/>
      </Container>

      

          <Container >
           pagina inicio
          </Container>   

            </Container>
       
   </>

    
  
  )
}

export default Inicio