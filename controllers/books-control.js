const { default: mongoose } = require("mongoose");
const { bookModel, userModel } = require("../models");

exports.getAllBooks = (req, res) => {
  const books = bookModel.find();
};
exports.getBookByID = () => {};
