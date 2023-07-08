const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const createFeedback = async (req, res) => {
    const { FeedbackDescription} = req.body;

    const [newFeedback] = await pool.query(`INSERT INTO tbl_feedback (FeedbackDescription,CreatedBy) 
        VALUES(?, ?)`, [FeedbackDescription, req.userId])
    var [feedback] = await pool.query(`SELECT * FROM tbl_feedback WHERE FeedbackId = ?`, [newFeedback.insertId])
    feedback = feedback[0]
    try {
        res.status(201).send(feedback);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const updateFeedback = async (req, res) => {
    const id = req.params.id;
    const { FeedbackDescription } = req.body;

    try {
        await pool.query(`UPDATE tbl_feedback SET FeedbackDescription = ? , CreatedBy = ? where FeedbackId = ?`, [FeedbackDescription, req.userId, id])
        var [feedback] = await pool.query(`SELECT * FROM tbl_feedback WHERE FeedbackId = ?`, [id])
        feedback = feedback[0]
        res.status(200).json(feedback);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const deleteFeedback = async (req, res) => {
    const id = req.params.id;

    try {
        await pool.query(`DELETE FROM tbl_feedback where FeedbackId = ?`, [id])
        res.status(202).json("Feedback Deleted");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

};

const getFeedback = async (req, res) => {
    try {
        var [feedback] = await pool.query(`SELECT * FROM tbl_feedback where CreatedBy = ?`, [req.userId]);
        res.status(200).json(feedback);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getallFeedback = async (req, res) => {
    try {
        var [feedbacks] = await pool.query(`SELECT * FROM tbl_feedback`);
        res.status(200).json(feedbacks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedback,
    getallFeedback
};