const mongoose = require('mongoose');
const config = require('config');
var db;

if (process.env.NODE_ENV === 'production') {
  db = process.env.mongoURI;
} else {
  db = config.get('mongoURI');
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MONGODB CONNECTED');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
