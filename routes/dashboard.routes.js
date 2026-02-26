const router = require('express').Router();
const dashboardController = require('../controller/dashboard.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'MENTOR'), dashboardController.getDashboard);

module.exports = router;