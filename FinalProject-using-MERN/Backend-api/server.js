const express = require('express');
const dotenv = require('dotenv');
const colors=require('colors');
const cors = require('cors')
const morgan = require('morgan');
const connectDB = require('./config/db');

//dot config
dotenv.config()

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/test',require('./routes/testproject'));
app.use('/api/v1/auth',require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));


//port
const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT,()=>{
    // console.log('node server is running on port 8080')
    console.log(
        `node server is running in ${process.env.DEV_MODE} Mode on Port ${process.env.PORT}`.bgMagenta.red
        )

})