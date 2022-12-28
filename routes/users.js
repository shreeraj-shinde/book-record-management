const express = require("express");

const { users } = require("../data/users.json");
const { books } = require("../data/books.json");

const router = express.Router();

/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public
 * Parameters : None
 */
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
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
 * Route : /users/:id
 * Method : POST
 * Description : Update user data
 * Access : Public
 * Parameters : id
 */
router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res
      .status(404)
      .send({ Sucess: "False", messege: "No Data Provided" });
  }
  users.push(data);
  return res.status(202).send({ Sucess: "True", data: users });
});

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Update user data
 * Access : Public
 * Parameters : id
 */

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

/**
 * Route : /users/subscription-details/:id
 * Method : GET
 * Description : Getting User Subscription Details
 * Access : Public
 * Parameters : id
 */
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      success: "False",
      message: "USER NOT FOUND",
    });
  }
  const getDateInDays = (date = "") => {
    if (date === "") {
      //Current Date
      date = new Date();
    } else {
      //Date on the basis of data variable
      date = new Date(date);
    }
    let Days = Math.floor(date / (1000 * 60 * 60 * 24));
    return Days;
  };
  const getSubscriptionType = (Days) => {
    if (user.subscriptionType === "Basic") {
      Days = Days + 90;
    } else if (user.subscriptionType === "Standard") {
      Days = Days + 180;
    } else if (user.subscriptionType === "Premium") {
      Days = Days + 365;
    }
    return Days;
  };

  // Subscription expiration calculation
  // january 1,1970,UTC. // milliseconds
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = getSubscriptionType(subscriptionDate);

  const Data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftforExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionDate - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };
  res.status(200).send({
    success: "True",
    data: Data,
  });
});
module.exports = router;
