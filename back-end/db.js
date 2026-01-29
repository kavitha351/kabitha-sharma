const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
console.log("MONGO_URI from env:", process.env.MONGO_URI);

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully:", mongoURI);
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
