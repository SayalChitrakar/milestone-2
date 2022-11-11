const express = require('express');
const app = express();

const itemRoutes = require('./Routes/itemRoutes');
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const checkOutRoutes = require('./Routes/checkOutRoutes');

app.use(express.json());

app.use('/api/v1/item',itemRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/checkout',checkOutRoutes);
module.exports = app;