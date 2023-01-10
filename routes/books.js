const express = require("express");
const {
  getAllBooks,
  getSingleBookByID,
  getAllIssuedBooks,
  CreateNewBook,
  UpdateBookById,
  getBookByName,
  deleteBookById,
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

router.get("/getbook/:name", getBookByName);

/**
 * Route : /books/
 * Method : POST
 * Description : ADD new book
 * Access : Public
 * Parameters : data
 */
router.post("/", CreateNewBook);

/**
 * Route : /books/:id
 * Method : PUT
 * Description : Update book data
 * Access : Public
 * Parameters : id
 */
router.put("/:id", UpdateBookById);

/**
 * Route : /books/issued/books
 * Method : PUT
 * Description : Get issued book details
 * Access : Public
 * Parameters : None
 */
router.get("/issued/by-user", getAllIssuedBooks);

router.delete("/:id", deleteBookById);
module.exports = router;
