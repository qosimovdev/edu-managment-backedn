const router = require('express').Router();
const paymentController = require('../controller/paymet.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Student paymentlarni boshqarish
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Yangi payment qo‘shish
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - amount
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 150.5
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-15"
 *               method:
 *                 type: string
 *                 enum: [cash, card, online]
 *                 example: cash
 *               note:
 *                 type: string
 *                 example: "First installment"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', roleMiddleware('ADMIN'), paymentController.createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Student paymentlar ro‘yxatini olish
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment list
 *       500:
 *         description: Server error
 */
router.get('/', roleMiddleware('ADMIN', 'MENTOR'), paymentController.getPayments);

module.exports = router;