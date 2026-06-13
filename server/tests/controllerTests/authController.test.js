const { login } = require('../../controllers/authController');
const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');

jest.mock('../../models/Admin');
jest.mock('jsonwebtoken');

describe('Auth Controller - login()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),    
      json: jest.fn()
    };

    jest.clearAllMocks();
    
    process.env.JWT_SECRET = 'test_secret';
  });

  it('should return 400 if email or password is missing', async () => {
    req.body = { email: 'admin@test.com' };    

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
  });

  it('should return 401 if admin is not found', async () => {
    req.body = { email: 'wrong@test.com', password: 'password123' };
    
    Admin.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(Admin.findOne).toHaveBeenCalledWith({ email: 'wrong@test.com' });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should return 401 if password does not match', async () => {
    req.body = { email: 'admin@test.com', password: 'wrongpassword' };
    
    const mockAdmin = {
      email: 'admin@test.com',
      comparePassword: jest.fn().mockResolvedValue(false)   
    };

    Admin.findOne.mockResolvedValue(mockAdmin);

    await login(req, res);

    expect(mockAdmin.comparePassword).toHaveBeenCalledWith('wrongpassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should return 200, a token, and admin info on successful login', async () => {
    req.body = { email: 'admin@test.com', password: 'correctpassword' };
    
    const mockAdmin = {
      _id: 'admin_123_id',
      email: 'admin@test.com',
      role: 'admin',
      password: 'hashed_password',    
      comparePassword: jest.fn().mockResolvedValue(true)    
    };

    const mockToken = 'mocked_jwt_token_string';

    Admin.findOne.mockResolvedValue(mockAdmin);
    jwt.sign.mockReturnValue(mockToken); 

    await login(req, res);

    expect(Admin.findOne).toHaveBeenCalledWith({ email: 'admin@test.com' });
    expect(mockAdmin.comparePassword).toHaveBeenCalledWith('correctpassword');
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockAdmin._id, role: mockAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    expect(res.json).toHaveBeenCalledWith({
      token: mockToken,
      admin: {
        id: mockAdmin._id,
        email: mockAdmin.email,
        role: mockAdmin.role
      }
    });
  });

  it('should return 500 if a server error occurs', async () => {
    req.body = { email: 'admin@test.com', password: 'password123' };
    
    Admin.findOne.mockRejectedValue(new Error('Database failure'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });

    consoleSpy.mockRestore(); 
  });
});