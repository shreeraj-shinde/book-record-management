const express = require("express");

const { books } = require("../data/books.json");

const router = express.Router();

/**
 * Route : /books
 * Method : GET
 * Description : Get all books
 * Access : Public
 * Parameters : None
 */
router.get("/", (req, res) => {
  res.status(200).send({
    sucess: "True",
    data: books,
  });
});

/**
 * Route : /books/id
 * Method : GET
 * Description : Get all books by id
 * Access : Public
 * Parameters : id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).send({
      Sucess: "False",
      message: "Book not Found",
    });
  }
  return res.status(404).send({
    sucess: "Ture",
    data: book,
  });
});

/**
 * Route : /books/:id
 * Method : PUT
 * Description : Update book data
 * Access : Public
 * Parameters : id
 */
router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => (each.id = id));
  if (!book) {
    return res.status("404").send({
      sucess: "False",
      messege: "Book not Found",
    });
  }
  const updatedBook = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  res.status(200).send({ sucess: "True", data: updatedBook });
});

module.exports = router;
