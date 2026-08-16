const db = require("../config/db");


// Get all restaurants

const getRestaurants = (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            cuisine,
            rating,
            delivery_time,
            image
        FROM restaurants
        ORDER BY rating DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch restaurants",
                error: err.message
            });

        }

        res.json(results);

    });

};


// Get restaurant by ID

const getRestaurantById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            id,
            name,
            cuisine,
            rating,
            delivery_time,
            image
        FROM restaurants
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch restaurant",
                error: err.message
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Restaurant not found"
            });

        }

        res.json(results[0]);

    });

};


module.exports = {
    getRestaurants,
    getRestaurantById
};