const router = require('express').Router();
const groupController = require('../controller/group.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Guruhlarni boshqarish
 */

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Yangi guruh yaratish
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - mentorId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "HTML 1"
 *               mentorId:
 *                 type: integer
 *                 example: 2
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-20"
 *               schedule:
 *                 type: string
 *                 example: "Mon Wed Fri"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', roleMiddleware('ADMIN'), groupController.createGroup);

/**
 * @swagger
 * /api/groups/{id}:
 *   patch:
 *     summary: Guruhni yangilash
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mentorId:
 *                 type: integer
 *               startDate:
 *                 type: string
 *                 format: date
 *               schedule:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       404:
 *         description: Group topilmadi
 *       500:
 *         description: Server error
 */
router.patch('/:id', roleMiddleware('ADMIN'), groupController.updateGroup);

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: Guruhni o‘chirish
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       404:
 *         description: Group topilmadi
 *       500:
 *         description: Server error
 */
router.delete('/:id', roleMiddleware('ADMIN'), groupController.deleteGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Guruhlar ro‘yxatini olish
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Grouplar list
 *       500:
 *         description: Server error
 */
router.get('/', roleMiddleware('ADMIN', 'MENTOR'), groupController.getGroups);

module.exports = router;