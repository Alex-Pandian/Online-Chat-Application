const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors=require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoute');

const app = express();
dotenv.config({path: path.join(__dirname, 'config', '.env')});

app.use(bodyParser.json());
app.use(cors({origin : process.env.ORIGIN, credentials : true }));
connectDB();

app.use('/api/user', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT}`);
});