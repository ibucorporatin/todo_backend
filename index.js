const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const authRoutes = require("./routes/auth");
const todosRoutes = require("./routes/todos");
const  verify  = require("./middleware/jwt_verify");
require("dotenv").config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/todos",verify, todosRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
