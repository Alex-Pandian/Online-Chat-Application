const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors=require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoute');
const chatRoutes =  require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
dotenv.config({path: path.join(__dirname, 'config', '.env')});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({origin : process.env.ORIGIN, credentials : true }));
app.use(cookieParser());
connectDB();

app.use('/api/', authRoutes);
app.use('/api', chatRoutes);
app.use('/api', messageRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT}`);
});