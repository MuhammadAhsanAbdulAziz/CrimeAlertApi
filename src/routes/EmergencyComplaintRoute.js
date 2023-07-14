const express = require("express");
const { getComplaint, createComplaint, deleteComplaint, updateComplaint,getallComplaint,getPendingComplaint,
    getCompletedComplaint } = require("../controllers/EmergencyComplaintController");
const auth = require("../middleware/auth");
const EmergencyComplaintRouter = express.Router();

EmergencyComplaintRouter.get("/",auth, getComplaint);

EmergencyComplaintRouter.get("/all",auth, getallComplaint);

EmergencyComplaintRouter.get("/pending",auth, getPendingComplaint);

EmergencyComplaintRouter.get("/completed",auth, getCompletedComplaint);

EmergencyComplaintRouter.post("/", createComplaint);

EmergencyComplaintRouter.delete("/:id",auth, deleteComplaint);

EmergencyComplaintRouter.put("/:id",auth, updateComplaint);

module.exports = EmergencyComplaintRouter;