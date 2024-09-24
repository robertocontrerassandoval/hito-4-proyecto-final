import React, { useState } from 'react';
import CustomNavbar from '../components/Navbar1';
import Container from 'react-bootstrap/Container';
import { Col, Row, Form, Button } from 'react-bootstrap';

function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    fechaNacimiento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log('Datos enviados:', formData);
      const response = await fetch('https://hito-4-proyecto-final.onrender.com/api/user/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la cuenta',error);
      }

      const data = await response.json();
      console.log('Cuenta creada exitosamente:', data);

      // Aquí puedes manejar la respuesta como desees (redirigir, mostrar un mensaje, etc.)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container className='container-home d-flex justify-content-center align-items-center'>
        <Container className="flex-column justify-content-center align-items-center">
          <Row>
            <Col className='text-center'>
              <h1 className='text-center'>INOVACIÓN Y TÉCNOLOGÍA PARA SUS PROYECTOS</h1>
              <p>
                Los grandes productores ya no aplican agua, fertilizantes, pesticidas y otros insumos
                “a ojo” o de manera uniforme en el campo. El uso de tecnología agrícola avanzada permite
                aplicar con precisión sólo lo necesario en cada lugar, así como adaptar cuidadosamente el
                tratamiento a cada planta.
              </p>
            </Col>
          </Row>
        </Container>

        <Container className="form-background d-flex flex-column justify-content-center align-items-center">
          <Row style={{ width: '80%' }}>
            <Col>
              <Form className='form-home w-100' onSubmit={handleSubmit}>
                <h2 className='text-center'>Crear una cuenta</h2>
                <Form.Group className="mb-2" controlId="formBasicName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese correo"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicNumber">
                  <Form.Label>Fecha de nacimiento (opcional)</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Ingresar fecha nacimiento"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Container className='d-flex justify-content-center'>
                  <Button variant="dark" type="submit">
                    Registrar
                  </Button>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Home;
