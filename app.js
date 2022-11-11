const express = require('express');
const app = express();
const itemRoutes = require('./Routes/itemRoutes');
const userRoutes = require('./Routes/userRoutes');

app.use(express.json());

app.use('/api/v1/item',itemRoutes);
app.use('/api/v1/user',userRoutes);

module.exports = app;