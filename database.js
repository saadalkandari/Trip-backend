const mongoose = require("mongoose");
const connectDB = async () => {
  const PASSWORD = "IgUxumwQ6mKMFvYK";
  const DATABASE_NAME = "Trips";
  const CONNECTION_URL = `mongodb+srv://MajdKhodari:${PASSWORD}@cluster0.n23rb.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
