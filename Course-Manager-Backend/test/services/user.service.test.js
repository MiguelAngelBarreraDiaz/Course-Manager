const { User } = require('../../src/models');
const userService = require('../../src/services/user.service')

// Mock de los métodos del modelo User
jest.mock('../../src/models', () => ({
  User: {
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('Servicio de Usuarios', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un usuario', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
      verified_email_at: null,
      role_id: 1
    };
    const createdUser = { id: 1, ...userData };
    User.create.mockResolvedValue(createdUser);

    const result = await userService.createUser(userData);

    expect(User.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual(createdUser);
  });

  it('debería obtener un usuario por id', async () => {
    const user = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
      verified_email_at: null,
      role_id: 4
    };
    User.findByPk.mockResolvedValue(user);

    const result = await userService.getUserById(1);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(user);
  });

  it('debería actualizar un usuario', async () => {
    const user = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
      verified_email_at: null,
      role_id: 4,
      update: jest.fn()
    };
    const userData = { first_name: 'Jane' };
    User.findByPk.mockResolvedValue(user);
    user.update.mockResolvedValue(user);

    const result = await userService.updateUser(1, userData);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(user.update).toHaveBeenCalledWith(userData);
    expect(result).toEqual(user);
  });

  it('debería eliminar un usuario', async () => {
    const user = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
      verified_email_at: null,
      role_id: 4,
      destroy: jest.fn()
    };
    User.findByPk.mockResolvedValue(user);
    user.destroy.mockResolvedValue();

    const result = await userService.deleteUser(1);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(user.destroy).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Usuario eliminado correctamente' });
  });
});