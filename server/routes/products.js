const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/', productCtrl.list);

module.exports = router;
