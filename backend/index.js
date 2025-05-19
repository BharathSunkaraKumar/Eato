const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRouters = require('./routes/vendorRoutes');
const firmRouters = require('./routes/firmRoutes');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

//port, dotenv, body-parser
const PORT = 3000;
dotEnv.config();
app.use(bodyParser.json());

//connecting mongoose
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('mongoDB connected successfully'))
.catch((err) => console.log(err))

app.use('/vendor', vendorRouters);
app.use('/firm', firmRouters);
app.use('/product', productRoutes);

app.use('/home', (req, res) => {
    res.send('home page')
})
app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`)
})