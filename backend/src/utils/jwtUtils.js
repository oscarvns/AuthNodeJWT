const jwt = require('jsonwebtoken');

// Generar token JWT
exports.generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Verificar token JWT
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
  } catch (error) {
    return null;
  }
};