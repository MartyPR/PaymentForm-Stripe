const mongoose = require("mongoose");

//pas:
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_KEY);
    console.log(`Mongoose  connected ${connect}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB ${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
