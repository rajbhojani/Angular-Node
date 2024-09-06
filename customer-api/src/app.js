const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());


const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); 
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
