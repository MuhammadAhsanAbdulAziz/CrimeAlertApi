const express = require("express");
const { getComplaint, createComplaint, deleteComplaint, updateComplaint,getallComplaint } = require("../controllers/ComplaintController");
const auth = require("../middleware/auth");
const ComplaintRouter = express.Router();

ComplaintRouter.get("/",auth, getComplaint);

ComplaintRouter.get("/all",auth, getallComplaint);

ComplaintRouter.post("/",auth, createComplaint);

ComplaintRouter.delete("/:id",auth, deleteComplaint);

ComplaintRouter.put("/:id",auth, updateComplaint);

module.exports = ComplaintRouter;