const router = require('express').Router();
const groupController = require('../controller/group.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware('ADMIN'), groupController.createGroup);
router.patch('/:id', authMiddleware, roleMiddleware('ADMIN'), groupController.updateGroup);
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), groupController.deleteGroup);

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'MENTOR'), groupController.getGroups);

module.exports = router;