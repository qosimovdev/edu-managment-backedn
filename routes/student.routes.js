const router = require('express').Router();
const studentController = require('../controller/student.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const roleMiddleware = require('../middlewares/role.middleware')

router.post('/', authMiddleware, roleMiddleware('ADMIN'), studentController.createStudent);
router.patch('/:id', authMiddleware, roleMiddleware('ADMIN'), studentController.updateStudent);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), studentController.deleteStudent);

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'MENTOR'), studentController.getStudents);

module.exports = router;