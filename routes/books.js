const express = require("express");
const {
  getAllBooks,
  getSingleBookByID,
  getAllIssuedBooks,
} = require("../controllers/books-control");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { UserModel } = require("../models");
const router = express.Router();

/**
 * Route : /books
 * Method : GET
 * Description : Get all books
 * Access : Public
 * Parameters : None
 */
router.get("/", getAllBooks);

/**
 * Route : /books/id
 * Method : GET
 * Description : Get all books by id
 * Access : Public
 * Parameters : id
 */
router.get("/:id", getSingleBookByID);

/**
 * Route : /books/
 * Method : POST
 * Description : ADD new book
 * Access : Public
 * Parameters : data
 */
router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(404)
      .send({ Sucess: "False", messege: "No Data Provided" });
  }
  books.push(data);
  return res.status(202).send({ Sucess: "True", data: books });
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
router.get("/issued/by-user", getAllIssuedBooks);

module.exports = router;
