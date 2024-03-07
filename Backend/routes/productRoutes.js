const express = require('express');
const router = express.Router();

const { createProduct, getAllProduct } = require('../controllers/productController');


router.post('/create', createProduct);
router.post('/', getAllProduct);

module.exports = router;