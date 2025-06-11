// const { PrismaClient } = require('@prisma/client');
// const { PrismaClient } = require('../utils/prisma');
const prisma = require('../utils/prisma');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');

// const prisma = new PrismaClient();

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    // Hash de contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    
    // Generar token
    const token = generateToken(user.id);
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }
    
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    
    // Generar token
    const token = generateToken(user.id);
    
    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
  try {
    // req.user ya está disponible gracias al middleware de autenticación
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    res.json({
      message: 'Perfil obtenido exitosamente',
      user
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};