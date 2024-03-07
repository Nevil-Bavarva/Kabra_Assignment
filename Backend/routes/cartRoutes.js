const express = require('express');
const { addToCart, updateCartItem, listCart } = require('../controllers/cartController');
const router = express.Router();


router.post('/AddToCart', addToCart);
router.post('/UpdateCart', updateCartItem);
router.post('/', listCart);

module.exports = router;