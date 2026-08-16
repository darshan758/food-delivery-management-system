const express = require("express");

const cors = require("cors");

require("dotenv").config();

const db = require("./config/db");

const restaurantRoutes =
    require("./routes/restaurantRoutes");


const app = express();


// Middleware

app.use(cors());

app.use(express.json());

app.use(
    "/api/restaurants",
    restaurantRoutes
);


// Home Route

app.get("/", (req, res) => {

    res.json({
        message: "Food Delivery API is running"
    });

});


// Test MySQL

app.get("/api/test-db", (req, res) => {

    db.query(
        "SELECT 1 AS result",
        (err, results) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Database connection failed",
                    error: err.message
                });

            }

            res.json({
                message: "MySQL connection working",
                result: results
            });

        }
    );

});


// Start Server

const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});