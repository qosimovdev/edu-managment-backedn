const router = require('express').Router();
const attendanceController = require('../controller/attendance.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware('ADMIN', 'MENTOR'), attendanceController.createAttendance);
router.get('/', authMiddleware, roleMiddleware('ADMIN', 'MENTOR'), attendanceController.getAttendance);

router.patch('/:id', authMiddleware, roleMiddleware('ADMIN'), attendanceController.updateAttendance);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), attendanceController.deleteAttendance);

module.exports = router;