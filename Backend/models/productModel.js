const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    pname: {
        type: String,
        required: [true, "Enter product name"],
        trim: true,
    },
    pprice: {
        type: String,
        required: [true, "Enter product price"],
        trim: true,
    },
    pdesc: {
        type: String,
        default: "No description available",
    },
    pquantity: {
        type: Number,
        required: [true, "Enter quantity"],
        minlength: 1,   
    },
    Pimage: {
        type: String,
        default: "No Image Available",
    }

}, {versionKey: false});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;