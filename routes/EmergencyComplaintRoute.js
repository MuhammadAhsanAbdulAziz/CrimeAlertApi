const express = require("express");
const { getComplaint, createComplaint, deleteComplaint, updateComplaint,getallComplaint,getPendingComplaint,
    getCompletedComplaint,updateStatusComplaint } = require("../controllers/EmergencyComplaintController");
const auth = require("../middleware/auth");
const EmergencyComplaintRouter = express.Router();

EmergencyComplaintRouter.get("/all",auth, getallComplaint);

EmergencyComplaintRouter.post("/", createComplaint);

EmergencyComplaintRouter.delete("/:id",auth, deleteComplaint);

EmergencyComplaintRouter.put("/:id",auth, updateComplaint);

EmergencyComplaintRouter.put("/status/:id",auth, updateStatusComplaint);

module.exports = EmergencyComplaintRouter;