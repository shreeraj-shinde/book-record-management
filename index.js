const express = require("express");
const dotenv = require("dotenv");
const { users } = require("./data/users.json");
// Database connections
const Dbconnection = require("./databaseConnection");
// Importing Routes
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
dotenv.config();
const app = express();
Dbconnection();

const port = 8081;

app.use(express.json());

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is Started",
  });
});

app.all("/", (req, res) => {
  res.status(404).send({
    "": "Not Found",
  });
});

app.get("*", (req, res) => {
  res.status(404).send({
    "": "Does not exist",
  });
});

app.listen(port, () => {
  console.log(`Server Started on port : ${port}`);
});
