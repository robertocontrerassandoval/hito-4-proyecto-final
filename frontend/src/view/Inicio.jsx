// import React from 'react'
// import NavbarInicio from '../components/NavbarInicio'
// import { Container,Row, Col, Form, Button} from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';


// const Inicio = () => {
//   return (

//    <>
//    <Container className="container-inicio d-flex flex-column justify-content-space-around">
     
     
//      <Container className='container-navbar-inicio'>
//           <NavbarInicio/>
//       </Container>

      

//           <Container >
//            pagina inicio
//           </Container>   

//             </Container>
       
//    </>

    
  
//   )
// }

// export default Inicio

import React from 'react';
import NavbarInicio from '../components/NavbarInicio';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Inicio = () => {
  return (
    <>
      <Container className="d-flex flex-column min-vh-100">
        <Row>
          <Col>
            <NavbarInicio />
          </Col>
        </Row>
        <Row className="flex-grow-1">
          <Col className="d-flex align-items-center justify-content-center">
            <h1>Página de Inicio</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Inicio;
