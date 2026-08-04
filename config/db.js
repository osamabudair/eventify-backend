const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To MongoDB ^_^");
  } catch (error) {
    console.log("Connection Failed To MongoDB!", error);
  }
}

module.exports = connectToDB;