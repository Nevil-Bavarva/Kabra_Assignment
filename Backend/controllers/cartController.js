const Cart = require('../models/cartModel');
const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel');

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findById("65e92e8be0afff5eeddf151d");
    
    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
    } 
    else {
        const existingItem = cart.items.find(item => item.product == productId);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
    }
    
    res.status(200).json({ message: 'Item added to cart successfully', cart });
});


const updateCartItem = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findById("65e92e8be0afff5eeddf151d");

    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
    }
    
    const item = cart.items.find(item => item.product == productId);
    if (!item) {
        res.status(404).json({ message: 'Item not found in cart' });
        return;
    }
    
    item.quantity = parseInt(quantity);
    await cart.save();
    
    res.status(200).json({ message: 'Item quantity updated successfully', cart });
});


const listCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne();
    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
    }

    const promises = cart.items.map(async (item) => {
        const product = await Product.findById(item.product).select('pname');
        return {
            product: item.product,
            productName: product ? product.pname : null,
            quantity: item.quantity
        };
    });

    const newCartItems = await Promise.all(promises);

    const newCart = {
        _id: cart._id,
        items: newCartItems
    };


    res.status(200).json(newCart);
});

module.exports = {
    addToCart,
    updateCartItem,
    listCart

}

