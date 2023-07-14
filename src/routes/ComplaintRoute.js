const express = require("express");
const { getComplaint, createComplaint, deleteComplaint, updateComplaint,getallComplaint,getPendingComplaint,
    getCompletedComplaint } = require("../controllers/ComplaintController");
const auth = require("../middleware/auth");
const ComplaintRouter = express.Router();

ComplaintRouter.get("/",auth, getComplaint);

ComplaintRouter.get("/all",auth, getallComplaint);

ComplaintRouter.get("/pending",auth, getPendingComplaint);

ComplaintRouter.get("/completed",auth, getCompletedComplaint);

ComplaintRouter.post("/",auth, createComplaint);

ComplaintRouter.delete("/:id",auth, deleteComplaint);

ComplaintRouter.put("/:id",auth, updateComplaint);

module.exports = ComplaintRouter;