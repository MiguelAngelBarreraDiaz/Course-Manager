const request = require('supertest');
const express = require('express');
const userController = require('../../src/controllers/user.controller');
const userService = require('../../src/services/user.service');

jest.mock('../../src/services/user.service');

const app = express();
app.use(express.json());
app.post('/api/users', userController.createUser);
app.get('/api/users/:id', userController.getUserById);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un usuario', async () => {
    const userData = { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: 'password123' };
    const createdUser = { id: 1, ...userData };
    userService.createUser.mockResolvedValue(createdUser);

    const response = await request(app)
      .post('/api/users')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdUser);
    expect(userService.createUser).toHaveBeenCalledWith(userData);
  });

  it('debería obtener un usuario por id', async () => {
    const user = { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' };
    userService.getUserById.mockResolvedValue(user);

    const response = await request(app)
      .get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
    expect(userService.getUserById).toHaveBeenCalledWith(1);
  });

  it('debería actualizar un usuario', async () => {
    const user = { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' };
    const updatedUser = { ...user, first_name: 'Jane' };
    userService.updateUser.mockResolvedValue(updatedUser);

    const response = await request(app)
      .put('/api/users/1')
      .send({ first_name: 'Jane' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedUser);
    expect(userService.updateUser).toHaveBeenCalledWith(1, { first_name: 'Jane' });
  });

  it('debería eliminar un usuario', async () => {
    const message = { message: 'Usuario eliminado correctamente' };
    userService.deleteUser.mockResolvedValue(message);

    const response = await request(app)
      .delete('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(message);
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
  });
});