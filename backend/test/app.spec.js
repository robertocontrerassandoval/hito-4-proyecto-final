import request from 'supertest';
import app from '../index';

describe('Product Routes', () => {
  it('should get all products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a product by ID', async () => {
    const res = await request(app).get('/products/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        titulo: 'New Product',
        imagen: 'url',
        descripcion: 'Description',
        precio: 100,
        stock: 10
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('product');
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put('/products/1')
      .send({
        titulo: 'Updated Product',
        imagen: 'new_url',
        descripcion: 'New Description',
        precio: 150,
        stock: 5
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('product');
  });

  it('should delete a product', async () => {
    const res = await request(app).delete('/products/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Producto eliminado');
  });
});




describe('GET /products', () => {
  it('should return a list of products with status 200', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    // Puedes agregar más expectativas dependiendo de la estructura esperada
  });

  it('should return an empty array if no products are found', async () => {
    // Aquí puedes configurar el controlador para devolver una lista vacía si es necesario
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
  });
});

