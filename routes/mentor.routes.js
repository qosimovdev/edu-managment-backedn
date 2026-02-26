const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const mentorController = require('../controller/user.controller');

// router.use(authMiddleware);
// router.use(roleMiddleware('ADMIN'));

/**
 * @swagger
 * tags:
 *   name: Mentors
 *   description: Mentorlarni boshqarish
 */

/**
 * @swagger
 * /api/mentors:
 *   post:
 *     summary: Yangi mentor yaratish
 *     tags: [Mentors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mentor created successfully
 *       400:
 *         description: Validatsiya xatosi
 *       409:
 *         description: Bu email bilan user mavjud
 *       500:
 *         description: Server error
 */
router.post('/', mentorController.createMentor);

/**
 * @swagger
 * /api/mentors/list:
 *   get:
 *     summary: Mentorlar ro'yxatini olish
 *     tags: [Mentors]
 *     responses:
 *       200:
 *         description: Mentorlar ro'yxati
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
router.get('/list', mentorController.getMentors);

module.exports = router;