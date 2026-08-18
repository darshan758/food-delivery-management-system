const db = require("../config/db");


// Get foods for a restaurant

const getFoodsByRestaurant = (req, res) => {

    const { restaurantId } = req.params;

    const sql = `
        SELECT
            id,
            restaurant_id,
            name,
            description,
            price,
            category,
            image
        FROM foods
        WHERE restaurant_id = ?
        ORDER BY category, name
    `;

    db.query(sql, [restaurantId], (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch food items",
                error: err.message
            });

        }

        res.json(results);

    });

};


// Get one food item

const getFoodById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            id,
            restaurant_id,
            name,
            description,
            price,
            category,
            image
        FROM foods
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch food item",
                error: err.message
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Food item not found"
            });

        }

        res.json(results[0]);

    });

};


module.exports = {
    getFoodsByRestaurant,
    getFoodById
};