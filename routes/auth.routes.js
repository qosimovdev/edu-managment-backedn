const router = require('express').Router();
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Foydalanuvchi autentifikatsiyasi
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchi login qilish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validatsiya xatosi
 *       401:
 *         description: Unauthorized
 */
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);

module.exports = router;