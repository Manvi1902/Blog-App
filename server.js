const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
const dotenv   = require('dotenv');
const connectDB = require('./config/connectdb');

//env config
dotenv.config();

//routes import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

//mongodb connection
connectDB();


//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routers

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog',blogRoutes);

//port
const PORT = process.env.PORT || 3000;

//listen
app.listen(PORT, ()=>{
    console.log(`server is started on ${process.env.DEV_NODE} at port  no. ${PORT}.....`.bgGreen.white);
});




