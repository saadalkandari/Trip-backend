const express = require("express");

const app = express();
dotenv.config();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
