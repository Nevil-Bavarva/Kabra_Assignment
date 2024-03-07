const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
//Router
const productRoute = require('./routes/productRoutes');
const cartRoute = require('./routes/cartRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);

// Routes
app.get("/", (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 5000;
mongoose
  .connect(`mongodb+srv://nevilBavarva:rY9T0S30YQ19Ab75@cluster0.ld723qc.mongodb.net/kabra_logitech?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));