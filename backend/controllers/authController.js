const db = require("../config/db");


// ======================================
// REGISTER USER
// ======================================

const registerUser = (req, res) => {

    const {
        name,
        email,
        phone,
        password
    } = req.body;


    // Validate required fields

    if (!name || !email || !password) {

        return res.status(400).json({
            message: "Name, email and password are required"
        });

    }


    // Check if email already exists

    const checkSql = `
        SELECT id
        FROM users
        WHERE email = ?
    `;


    db.query(
        checkSql,
        [email],
        (err, results) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }


            if (results.length > 0) {

                return res.status(409).json({
                    message: "Email already registered"
                });

            }


            // Insert user

            const insertSql = `
                INSERT INTO users
                (name, email, phone, password)
                VALUES (?, ?, ?, ?)
            `;


            db.query(
                insertSql,
                [
                    name,
                    email,
                    phone || null,
                    password
                ],
                (err, result) => {

                    if (err) {

                        console.error(err);

                        return res.status(500).json({
                            message: "Failed to register user"
                        });

                    }


                    res.status(201).json({

                        message:
                            "Registration successful",

                        userId:
                            result.insertId

                    });

                }
            );

        }
    );

};


module.exports = {
    registerUser
};