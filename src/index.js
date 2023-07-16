const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const app = express()
const dotenv = require("dotenv");
const feedbackRouter = require("./routes/feedbackRoute");
const complaintRouter = require("./routes/ComplaintRoute");
const emergencycomplaintRouter = require("./routes/EmergencyComplaintRoute");
dotenv.config();


app.use(express.json());
app.use(cors());
app.use("/users",userRouter);
app.use("/feedbacks",feedbackRouter);
app.use("/complaints",complaintRouter);
app.use("/emergencycomplaints",emergencycomplaintRouter);

app.get("/",(req,res)=>{
    res.send("CrimeAlert Api from Muhammad Ahsan");
});

app.listen(8080,()=>{
    console.log('listening on port 8080');
})
