const { BookModel, UserModel } = require("../models");
const booksModels = require("../models/books-models");
const IssuedBook = require("../dtos");
exports.getAllBooks = async (req, res) => {
  const Books = await BookModel.find();
  if (books.length === 0) {
    return res.status(404).json({
      sucess: false,
      message: "Book not Found",
    });
  }
  res.status(200).json({
    success: true,
    data: Books,
  });
};

exports.getSingleBookByID = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
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
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  const IssuedBooks = users.map((each) => new IssuedBook(each));

  if (IssuedBooks.length === 0) {
    return res.status(404).send({
      Sucess: "fales",
      messaege: "No issued books",
    });
  }
  return res.status(200).send({
    Success: "True",
    message: IssuedBooks,
  });
};
