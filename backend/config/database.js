const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongoDB connected successfully");
    }catch(error){
        console.log(`MongoDB disconnected, ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;