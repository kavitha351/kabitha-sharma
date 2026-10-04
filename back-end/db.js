const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = ()=> {
    mongoose.connect(mongoURI).then(() =>{
        console.log("Connected to MongoDB successfully");
    }).catch((error) =>{
        console.error("Error in connecting to MongoDB: ", error);
    })
}
module.exports = connectToMongo;