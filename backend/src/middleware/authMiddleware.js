// const { PrismaClient } = require('@prisma/client');
// const { PrismaClient } = require('../utils/prisma');
const prisma = require('../utils/prisma');
const { verifyToken } = require('../utils/jwtUtils');

// const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Verificar token 
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    
    // Añadir usuario a la petición
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};