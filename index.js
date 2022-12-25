const express = require("express");

const { users } = require("./data/users.json");

const { books } = require("./data/books.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is Started",
  });
});

/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public
 * Parameters : None
 */
app.get("/users", (req, res) => {
  res.status(200).send({
    Sucess: True,
    data: users,
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
