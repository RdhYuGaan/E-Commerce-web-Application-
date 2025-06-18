const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderCtrl');
const auth = require('../middleware/authMiddleware');

router.use(auth);
router.get('/', orderCtrl.list);
router.post('/', orderCtrl.place);
router.put('/:orderId', orderCtrl.cancel);

module.exports = router;
