const router = require('express').Router();
const paymentController = require('../controller/paymet.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware('ADMIN'), paymentController.createPayment);

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'MENTOR'), paymentController.getPayments);

module.exports = router;