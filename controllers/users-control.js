const { BookModel, UserModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json({
    Success: true,
    data: users,
  });
};

exports.getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
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
};

exports.CreatenewUser = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(404)
      .send({ Sucess: "False", messege: "No Data Provided" });
  }
  await UserModel.create(data);
  const users = await UserModel.find();
  return res.status(202).send({ Sucess: "True", data: users });
};

exports.UpdateUserByID = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedUser = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    { new: true }
  );
  users = await UserModel.find();
  res.status(200).json({ Success: "True", data: users });
};
