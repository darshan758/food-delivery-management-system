const express = require("express");

const router = express.Router();

const {
    getFoodsByRestaurant,
    getFoodById
} = require("../controllers/foodController");


// Get foods for a restaurant

router.get(
    "/restaurant/:restaurantId",
    getFoodsByRestaurant
);


// Get one food item

router.get(
    "/:id",
    getFoodById
);


module.exports = router;