const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`.yellow);
  } catch (error) {
    console.error(`Error ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
