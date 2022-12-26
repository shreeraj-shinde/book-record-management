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
    Sucess: "True",
    data: users,
  });
});

/**
 * Route : /users/id
 * Method : GET
 * Description : Get all users by id
 * Access : Public
 * Parameters : id
 */
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      Sucess: "False",
      message: "User not found",
    });
  }
  res.status(200).send({
    Sucess: "True",
    data: user,
  });
});

/**
 * Route : /users
 * Method : POST
 * Description : Create new user
 * Access : Public
 * Parameters : None
 */
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).send({
      Sucess: "False",
      message: "User already exist",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  res.status(200).send({
    Sucess: "True",
    data: users,
  });
});

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Update user data
 * Access : Public
 * Parameters : id
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      success: "False",
      message: "User not FOund",
    });
  }
  const updatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  res.status(200).send({
    sucess: "True",
    data: updatedUser,
  });
});

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Delete user by id
 * Access : Public
 * Parameters : id
 */

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      messege: "User Not Found",
    });
  }
  index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).send({
    Sucess: "True",
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
