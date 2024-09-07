import request from 'supertest';
import { app } from '../index'; // Ajusta la ruta según la ubicación de tu archivo `app.js`

describe('App Tests', () => {
  it('should respond to GET requests on the /home', async () => {
    const response = (await request(app).get('/:id')).send();
    expect(response.status).toBe(200); // Ajusta el código de estado según la implementación
  });

  it('should respond to POST requests on the /', async () => {
    const response = await request(app).post('/create-user').send({ name: 'John Doe' });
    expect(response.status).toBe(201); // Ajusta el código de estado según la implementación
    expect(response.body).toHaveProperty('name', 'John Doe');
  });

 
});
