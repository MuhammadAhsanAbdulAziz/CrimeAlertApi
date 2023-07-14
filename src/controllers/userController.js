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

    const { FName, LName, CNIC, Email, Password, RoleId } = req.body;
    try {

        const [existingUserEmail] = await pool.query(`SELECT * FROM tbl_user WHERE Email = ?`, [Email])
        const [existingUserCNIC] = await pool.query(`SELECT * FROM tbl_user WHERE CNIC = ?`, [CNIC])
        if (existingUserEmail[0] || existingUserCNIC[0]) {
            return res.status(400).json({ message: "User already exists" })
        }
        hashedPassword = await bcrypt.hash(Password, 10)
        const [result] = await pool.query(`INSERT INTO tbl_user (FName,LName,Email,CNIC,Password,RoleId) VALUES(?,?,?,?,?,?)`,
            [FName, LName, Email, CNIC, hashedPassword, RoleId])
        var [user] = await pool.query(`SELECT * FROM tbl_user WHERE UserId = ?`, [result.insertId])
        user = user[0]
        const token = jwt.sign({ email: user.Email, id: user.UserId, role: user.RoleId }, SECRET_KEY)
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

        const token = jwt.sign({ email: existingUser[0].Email, fname: existingUser[0].FName, lname: existingUser[0].LName, id: existingUser[0].UserId, role: existingUser[0].RoleId }, SECRET_KEY)
        existingUser = existingUser[0]
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getUser = async (req, res) => {
    try {
        var [User] = await pool.query(`SELECT * FROM tbl_user WHERE UserId = ?`, [req.userId]);
        User = User[0]
        res.status(200).json(User);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { FName, LName, CNIC, Email, Password, RoleId } = req.body;

    try {
        var [existingUserEmailCNIC] = await pool.query(`SELECT Email,CNIC FROM tbl_user WHERE UserId = ?`, [id])
        existingUserEmailCNIC = existingUserEmailCNIC[0]
        if (existingUserEmailCNIC.Email == Email && existingUserEmailCNIC.CNIC == CNIC) {
            hashedPassword = await bcrypt.hash(Password, 10)
            await pool.query(`UPDATE tbl_user SET FName = ?,LName = ?,Email = ?,CNIC = ?,Password = ?,RoleId = ? where UserId = ?`,
                [FName, LName, Email, CNIC, hashedPassword, RoleId, id])
            var [user] = await pool.query(`SELECT * FROM tbl_user WHERE UserId = ?`, [id])
            user = user[0]
            res.status(200).json(user);
        }
        else if (existingUserEmailCNIC.Email == Email) {
            const [existingUserCNIC] = await pool.query(`SELECT * FROM tbl_user WHERE CNIC = ?`, [CNIC])
            if (existingUserCNIC[0]) {
                return res.status(400).json({ message: "User already exists" })
            }
            else {
                hashedPassword = await bcrypt.hash(Password, 10)
                await pool.query(`UPDATE tbl_user SET FName = ?,LName = ?,Email = ?,CNIC = ?,Password = ?,RoleId = ? where ?`,
                    [FName, LName, Email, CNIC, hashedPassword, RoleId, id])
                var [user] = await pool.query(`SELECT * FROM tbl_user WHERE UserId = ?`, [id])
                user = user[0]
                res.status(200).json(user);
            }
        }
        else {
            const [existingUserEmail] = await pool.query(`SELECT * FROM tbl_user WHERE CNIC = ?`, [Email])
            if (existingUserEmail[0]) {
                return res.status(400).json({ message: "User already exists" })
            }
            else {
                hashedPassword = await bcrypt.hash(Password, 10)
                await pool.query(`UPDATE tbl_user SET FName = ?,LName = ?,Email = ?,CNIC = ?,Password = ?,RoleId = ? where UserId = ?`,
                    [FName, LName, Email, CNIC, hashedPassword, RoleId, id])
                var [user] = await pool.query(`SELECT * FROM tbl_user WHERE UserId = ?`, [id])
                user = user[0]
                res.status(200).json(user);
            }
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await pool.query(`DELETE FROM tbl_user where UserId = ?`, [id])
        res.status(202).json("User Deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};
module.exports = { signin, signup, getUser, updateUser, deleteUser };