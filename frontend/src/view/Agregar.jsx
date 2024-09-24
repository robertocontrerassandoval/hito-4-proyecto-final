import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Container, Form, Button, Card } from 'react-bootstrap';
import NavbarInicio from '../components/NavbarInicio';

const CrearProductoForm = () => {
  const { addProducto } = useAppContext();
  const [producto, setProducto] = useState({
    id: '',
    imagen: '',
    titulo: '',
    descripcion: '',
    precio: '',
    stock: ''
  });
  const [productoCreado, setProductoCreado] = useState(null);

  useEffect(() => {
    // Recupera productos almacenados del localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    if (productosGuardados.length > 0) {
      setProductoCreado(productosGuardados[productosGuardados.length - 1]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoProducto = {
      ...producto,
      id: Date.now() // Genera un ID único (puedes dejar que el servidor lo genere si lo prefieres)
    };
  
    try {
      // Enviar el nuevo producto al servidor
      const response = await fetch('postgresql://e_commers_user:NAu6LYPuBlRIbcYPU5g5n8nExgepTpoC@dpg-criapdij1k6c73artpv0-a.oregon-postgres.render.com/e_commers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
  
      const data = await response.json();
      addProducto(data); // Agrega el producto al contexto
  
      // Guardar el producto en localStorage (opcional)
      const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
      productosGuardados.push(data);
      localStorage.setItem('productos', JSON.stringify(productosGuardados));
  
      setProductoCreado(data);
  
      // Reinicia el formulario
      setProducto({
        id: '',
        imagen: '',
        titulo: '',
        descripcion: '',
        precio: '',
        stock: ''
      });
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <>
      <NavbarInicio />
      <Container className="d-flex flex-column align-items-center">
        <br></br>
        <h2>Crear Nuevo Producto</h2>
        <Form onSubmit={handleSubmit} className="w-50">
          <Form.Group controlId="formBasicTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título del producto"
              name="titulo"
              value={producto.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción del producto"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicImagen">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen del producto"
              name="imagen"
              value={producto.imagen}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio del producto"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el stock del producto"
              name="stock"
              value={producto.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Agregar Producto
          </Button>
        </Form>

        {productoCreado && (
          <Card className="mt-1" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={productoCreado.imagen}
            style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{productoCreado.titulo}</Card.Title>
              <Card.Text>
                {productoCreado.descripcion}
              </Card.Text>
              <Card.Text>
                Precio: ${productoCreado.precio}
              </Card.Text>
              <Card.Text>
                Stock: {productoCreado.stock}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default CrearProductoForm;
