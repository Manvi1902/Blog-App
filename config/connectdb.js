const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{

    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connect to mongodb!!! ${mongoose.connection.host}`.bgCyan.white);
    }catch(error){
        console.log(`MongoDB Connect Error ${error}`.bgRed.white);
    }

};

module.exports = connectDB;
