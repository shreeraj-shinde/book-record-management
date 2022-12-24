const express = require("express");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is Started",
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
