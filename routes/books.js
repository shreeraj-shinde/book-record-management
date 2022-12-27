const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
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
      message: "Book not found",
    });
  }
  return res.status(200).send({
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
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).send({
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
  res.status(200).json({ sucess: "True", data: { ...books, ...updatedBook } });
});

/**
 * Route : /books/issued/books
 * Method : GET
 * Description : Get issued book details
 * Access : Public
 * Parameters : None
 */
router.get("/issued/by-user", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const IssuedBooks = [];

  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => each.issuedBook === book.id);
    book.IssuedBy = each.name;
    book.IssuedBook = each.issuedDate;
    book.returnDate = each.returnDate;

    IssuedBooks.push(book);
  });

  if (IssuedBooks.length === 0) {
    return res.status(404).send({
      Sucess: "fales",
      messaege: "No issued books",
    });
  }
  return res.status(200).send({
    Sucess: "True",
    message: IssuedBooks,
  });
});

module.exports = router;
