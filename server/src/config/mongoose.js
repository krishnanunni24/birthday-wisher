const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

 const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connect

