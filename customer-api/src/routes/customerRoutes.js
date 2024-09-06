const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/', jwtMiddleware, customerController.addCustomer);
router.get('/all', jwtMiddleware, customerController.getAllCustomers);
router.get('/:id', jwtMiddleware, customerController.getCustomer);
router.put('/:id', jwtMiddleware, customerController.editCustomer);

module.exports = router;
