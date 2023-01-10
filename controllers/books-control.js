const { BookModel, UserModel } = require("../models");

const IssuedBook = require("../dtos/book-dtos");
exports.getAllBooks = async (req, res) => {
  const Books = await BookModel.find();
  if (Books.length === 0) {
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

exports.getBookByName = async (req, res) => {
  const { name } = req.params;
  const book = await BookModel.findOne({
    name: name,
  });
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

exports.CreateNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(404)
      .send({ Sucess: "False", messege: "No Data Provided" });
  }
  await BookModel.create(data);
  const allBooks = await BookModel.find();
  return res.status(202).send({ Sucess: "True", data: allBooks });
};

exports.UpdateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  res.status(200).json({ sucess: "True", data: updatedBook });
};

exports.deleteBookById = async (req, res) => {
  const { id } = req.params;
  await BookModel.findByIdAndRemove(id);
  const books = BookModel.find();
  res.status(200).send({ Success: "True", Data: books });
};
