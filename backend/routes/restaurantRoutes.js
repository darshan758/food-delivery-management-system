const express = require("express");

const router = express.Router();

const {
    getRestaurants,
    getRestaurantById
} = require("../controllers/restaurantController");


// GET all restaurants

router.get(
    "/",
    getRestaurants
);


// GET restaurant by ID

router.get(
    "/:id",
    getRestaurantById
);


module.exports = router;