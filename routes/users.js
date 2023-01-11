const express = require("express");

const { users } = require("../data/users.json");
const { books } = require("../data/books.json");
const {
  getAllUsers,
  getUserByID,
  UpdateUserByID,
  CreatenewUser,
  deleteUserByID,
} = require("../controllers/users-control");

const router = express.Router();

/**
 * Route : /users
 * Method : GET
 * Description : Get all users
 * Access : Public
 * Parameters : None
 */
router.get("/", getAllUsers);

/**
 * Route : /users/id
 * Method : GET
 * Description : Get all users by id
 * Access : Public
 * Parameters : id
 */
router.get("/:id", getUserByID);

/**
 * Route : /users
 * Method : POST
 * Description : create user data
 * Access : Public
 * Parameters : id
 */
router.post("/", CreatenewUser);

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Update user data
 * Access : Public
 * Parameters : id
 */

router.put("/:id", UpdateUserByID);

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Delete user by id
 * Access : Public
 * Parameters : id
 */

router.delete("/:id", deleteUserByID);

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
