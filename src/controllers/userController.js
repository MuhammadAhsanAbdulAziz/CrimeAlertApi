const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
    // Existing user check
    // hashed Password
    // user creation
    // token generate

    const { FName, LName, Email, Password, RoleId } = req.body;
    try {

        const [existingUser] = await pool.query(`SELECT * FROM tbl_user WHERE Email = ?`, [Email])
        if (existingUser[0]) {
            return res.status(400).json({ message: "User already exists" })
        }
        hashedPassword = await bcrypt.hash(Password, 10)
        const [result] = await pool.query(`INSERT INTO tbl_user (FName,LName,Email,Password,RoleId) VALUES(?,?,?,?,?)`,
            [FName, LName, Email, hashedPassword, RoleId])
        var [user] = await pool.query(`SELECT * FROM tbl_user WHERE UserId = ?`, [result.insertId])
        user = user[0]
        const token = jwt.sign({ email: user.Email, id: user.UserId , role: user.RoleId}, SECRET_KEY)
        res.status(201).send({ user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

const signin = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        var [existingUser] = await pool.query(`SELECT * FROM tbl_user WHERE Email = ?`, [Email])
        if (!existingUser[0]) {
            return res.status(404).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(Password, existingUser[0].Password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ email: existingUser[0].Email, id: existingUser[0].UserId , role: existingUser[0].RoleId }, SECRET_KEY)
        existingUser = existingUser[0]
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { signin, signup };