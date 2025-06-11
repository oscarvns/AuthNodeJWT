const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas (no requieren autenticación)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas protegidas (requieren autenticación)
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;