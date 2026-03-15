const router = require('express').Router();
const studentController = require('../controller/student.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Studentlarni boshqarish
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Yangi student yaratish
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - groupId
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Ibrohim Qosimov"
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               groupId:
 *                 type: integer
 *                 example: 1
 *               joinedDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-15"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *               balance:
 *                 type: number
 *                 format: float
 *                 example: 0
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', roleMiddleware('ADMIN'), studentController.createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   patch:
 *     summary: Student ma'lumotlarini yangilash
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               groupId:
 *                 type: integer
 *               joinedDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *               balance:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Server error
 */
router.patch('/:id', roleMiddleware('ADMIN'), studentController.updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Studentni o‘chirish
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student topilmadi
 *       500:
 *         description: Server error
 */
router.delete('/:id', roleMiddleware('ADMIN'), studentController.deleteStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Studentlar ro‘yxatini olish
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Studentlar ro‘yxati
 *       500:
 *         description: Server error
 */
router.get('/', roleMiddleware('ADMIN', 'MENTOR'), studentController.getStudents);

module.exports = router;