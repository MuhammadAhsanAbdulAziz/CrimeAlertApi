const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const createComplaint = async (req, res) => {
    const { CompTitle ,CompUPhone, CompDescription, CompStatus} = req.body;

    const [newComplaint] = await pool.query(`INSERT INTO tbl_complaint 
    (CompTitle,CompUName,CompUPhone,CompDescription,CompStatus,CreatedBy) 
        VALUES(?,?,?,?,?,?)`, [CompTitle,req.userName,CompUPhone,CompDescription,CompStatus, req.userId])
    var [Complaint] = await pool.query(`SELECT * FROM tbl_complaint WHERE CompId = ?`, [newComplaint.insertId])
    Complaint = Complaint[0]
    try {
        res.status(201).send(Complaint);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateComplaint = async (req, res) => {
    const id = req.params.id;
    const { CompTitle , CompDescription, CompStatus} = req.body;

    try {
        await pool.query(`UPDATE tbl_complaint SET CompTitle = ?,CompDescription = ?,CompStatus = ? where CompId = ?`,
        [CompTitle,CompDescription,CompStatus,id])
        var [Complaint] = await pool.query(`SELECT * FROM tbl_complaint WHERE CompId = ?`, [id])
        Complaint = Complaint[0]
        res.status(200).json(Complaint);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const updateStatusComplaint = async (req, res) => {
    const id = req.params.id;
    const { CompStatus} = req.body;

    try {
        await pool.query(`UPDATE tbl_complaint SET CompStatus = ? where CompId = ?`,
        [CompStatus,id])
        var [Complaint] = await pool.query(`SELECT * FROM tbl_complaint WHERE CompId = ?`, [id])
        Complaint = Complaint[0]
        res.status(200).json(Complaint);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const deleteComplaint = async (req, res) => {
    const id = req.params.id;

    try {
        var [Complaint] = await pool.query(`DELETE FROM tbl_complaint where CompId = ?`, [id])
        Complaint = Complaint[0]
        res.status(202).json(Complaint);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const getComplaint = async (req, res) => {
    try {
        var [Complaint] = await pool.query(`SELECT * FROM tbl_complaint where CreatedBy = ?`, [req.userId]);
        res.status(200).json(Complaint);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getPendingComplaint = async (req, res) => {
    try {
        var [Complaint] = await pool.query(`SELECT * FROM tbl_complaint where CreatedBy = ${req.userId} AND CompStatus = 1`);
        res.status(200).json(Complaint);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getCompletedComplaint = async (req, res) => {
    try {
        var [Complaint] = await pool.query(`SELECT * FROM tbl_complaint where CreatedBy = ${req.userId} AND CompStatus = 0`);
        res.status(200).json(Complaint);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getallComplaint = async (req, res) => {
    try {
        var [Complaints] = await pool.query(`SELECT * FROM tbl_complaint`);
        res.status(200).json(Complaints);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    createComplaint,
    updateComplaint,
    deleteComplaint,
    getComplaint,
    getallComplaint,
    getPendingComplaint,
    getCompletedComplaint,
    updateStatusComplaint
};