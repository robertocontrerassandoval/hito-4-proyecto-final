// import React, { useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import { Col, Row, Form, Button } from 'react-bootstrap';
// import NavbarInicioSesion from '../components/NavbarInicioSesion';
// import { useNavigate } from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { setUser } = useAppContext();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Validación adicional del correo electrónico
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('Ingresa un correo electrónico válido.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fakeLogin(email, password);
//       setLoading(false);

//       console.log('Respuesta de fakeLogin:', response); // Debugging

//       if (response.success) {
//         setUser(response.user); // Guarda al usuario en el contexto global
//         navigate('/perfil'); // Redirige al perfil del usuario
//       } else {
//         setError('Credenciales incorrectas');
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error('Error en fakeLogin:', error); // Debugging
//       setError('Ocurrió un error. Intenta nuevamente.');
//     }
//   };

//   // Función para simular la autenticación
//   const fakeLogin = (email, password) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (email === 'usuario@example.com' && password === '123456') {
//           resolve({ success: true, user: { nombre: 'Usuario Ejemplo', email: 'usuario@example.com' } });
//         } else {
//           resolve({ success: false });
//         }
//       }, 1000); // Simula un retardo de 1 segundo
//     });
//   };

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Form, Button, Spinner, Alert } from 'react-bootstrap';
import NavbarInicioSesion from '../components/NavbarInicioSesion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext(); // Contexto para gestionar el usuario
  const navigate = useNavigate();

  // Función para manejar la respuesta de la API de login
  const loginUser = async (email, password) => {
    const response = await fetch('https://hito-4-proyecto-final-1-ozdl.onrender.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      data = null;
    }

    return { status: response.status, ok: response.ok, data };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación de email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true); // Muestra spinner

    try {
      const response = await loginUser(email, password);
      setLoading(false); // Oculta spinner

      if (response.ok) {
        // Autenticación exitosa
        setUser(response.data.user); // Actualiza usuario en contexto
        navigate('/perfil'); // Redirige a perfil
      } else {
        // Manejo de errores en la respuesta
        if (response.status === 401) {
          setError('Credenciales incorrectas.');
        } else {
          setError(response.data?.message || 'Ocurrió un error. Intenta nuevamente.');
        }
      }
    } catch (error) {
      // Errores inesperados
      setLoading(false);
      console.error('Error en loginUser:', error);
      setError('Ocurrió un error. Intenta nuevamente.');
    }
  };

  return (
    <Container className="mt-5">
      <NavbarInicioSesion />
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <div className="form-container-login p-4 shadow-sm rounded">
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            
            {/* Mostrar mensajes de error */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresar contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Ingresando...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

