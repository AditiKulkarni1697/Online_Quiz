const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./db/connection");
const { quizRouter } = require("./routes/quiz.routes");


const app = express();

app.use(express.json())
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/quiz", quizRouter)


try {
  connection()
  console.log("Server is connected to database");
  app.listen(process.env.PORT, () => {
    console.log("server is running at port",process.env.PORT);
  });
} catch (err) {
  console.log("error in connecting to db", err.message);
}
