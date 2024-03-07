const Product = require('../models/productModel');
const asyncHandler = require("express-async-handler");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) 
    }
});
const upload = multer({ storage: storage });


const createProduct = asyncHandler(async (req, res) => {
    const { pname, pquantity, pprice, pdesc } = req.body;
    const pimage = "C:/Users/nevil/Downloads/image.jpeg";

    if (!pname || !pquantity || !pdesc || !pprice || !pimage) {
        res.status(400);
        throw new Error("Please fill all the details");
    }

    const product =  Product.create({
        pname: pname,
        pquantity: pquantity,
        pprice: pprice,
        pdesc: pdesc,
        pimage: pimage,
    });

    res.status(201).json(req.body);
});


const getAllProduct = asyncHandler (async (req, res)=> {
    const products = await Product.find();
    if(products) {
        res.status(200).json(products);
    } else {
        res.status(400);
        throw new Error("No product found");
    } 
    
});

module.exports = {
    createProduct,
    getAllProduct,
}