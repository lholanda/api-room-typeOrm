import { LoginController } from '../../src/controllers/LoginController';
import { Request, Response } from 'express';
import { UserService } from '../../src/services/UserService'; // Adapte o caminho conforme sua estrutura
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../src/helpers/Api-errors'; // Adapte conforme a sua estrutura


// Mocks
jest.mock('../services/UserService');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('LoginController', () => {
  let loginController: LoginController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    loginController = new LoginController();
    
    mockReq = {
      body: {
        email: 'user@example.com',
        password: 'password123'
      }
    };

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    mockRes = {
      status: mockStatus,
    };
  });

  it('should return user data and JWT token on successful login', async () => {
    const user = {
      id: 1,
      email: 'user@example.com',
      password: 'hashed_password'
    };

    // Mock UserService to return a valid user
    (UserService.findByEmail as jest.Mock).mockResolvedValue(user);

    // Mock bcrypt to verify password successfully
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    // Mock JWT sign
    (jwt.sign as jest.Mock).mockReturnValue('mock_token');

    await loginController.login(mockReq as Request, mockRes as Response);

    expect(UserService.findByEmail).toHaveBeenCalledWith('user@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalledWith({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' });

    // Check if response has been called with correct status and data
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      user: { id: 1, email: 'user@example.com' },
      token: 'mock_token'
    });
  });

  it('should throw error when user is not found', async () => {
    // Mock UserService to return null (user not found)
    (UserService.findByEmail as jest.Mock).mockResolvedValue(null);

    try {
      await loginController.login(mockReq as Request, mockRes as Response);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe('Invalid credentials. Please check your email and password.');
    }

    expect(UserService.findByEmail).toHaveBeenCalledWith('user@example.com');
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('should throw error when password is incorrect', async () => {
    const user = {
      id: 1,
      email: 'user@example.com',
      password: 'hashed_password'
    };

    // Mock UserService to return a valid user
    (UserService.findByEmail as jest.Mock).mockResolvedValue(user);

    // Mock bcrypt to return false (password mismatch)
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    try {
      await loginController.login(mockReq as Request, mockRes as Response);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe('Invalid credentials. Please check your email and password.');
    }

    expect(UserService.findByEmail).toHaveBeenCalledWith('user@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
