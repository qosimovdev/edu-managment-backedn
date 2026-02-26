const router = require('express').Router();
const authController = require('../controller/auth.controller');

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

module.exports = router;