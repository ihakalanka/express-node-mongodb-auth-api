const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const port = parseInt(process.env.PORT) || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log('Error occured when connecting to mongodb', err);
});

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        status: 200,
        message: 'Welcome to the API',
    });
});

app.use('/api/v1/auth', require('./routes/authRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});