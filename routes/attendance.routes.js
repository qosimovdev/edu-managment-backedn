const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const attendanceController = require('../controller/attendance.controller');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Attendances
 *   description: Attendance boshqarish
 */

/**
 * @swagger
 * /api/attendances:
 *   post:
 *     summary: Yangi attendance qo‘shish
 *     tags: [Attendances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - date
 *             properties:
 *               studentId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [present, absent, late]
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attendance qo‘shildi
 *       400:
 *         description: StudentId yoki date yo‘q
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', roleMiddleware('ADMIN', 'MENTOR'), attendanceController.createAttendance);

/**
 * @swagger
 * /api/attendances:
 *   get:
 *     summary: Barcha attendance larni olish
 *     tags: [Attendances]
 *     responses:
 *       200:
 *         description: Attendance list
 *       500:
 *         description: Server error
 */
router.get('/', roleMiddleware('ADMIN', 'MENTOR'), attendanceController.getAttendance);

/**
 * @swagger
 * /api/attendances/{id}:
 *   patch:
 *     summary: Attendance yangilash
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Attendance ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [present, absent, late]
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attendance yangilandi
 *       404:
 *         description: Attendance topilmadi
 *       500:
 *         description: Server error
 */
router.patch('/:id', roleMiddleware('ADMIN'), attendanceController.updateAttendance);

/**
 * @swagger
 * /api/attendances/{id}:
 *   delete:
 *     summary: Attendance o‘chirish
 *     tags: [Attendances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Attendance ID
 *     responses:
 *       200:
 *         description: Attendance o‘chirildi
 *       404:
 *         description: Attendance topilmadi
 *       500:
 *         description: Server error
 */
router.delete('/:id', roleMiddleware('ADMIN'), attendanceController.deleteAttendance);

module.exports = router;