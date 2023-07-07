const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const noteRouter = require("./routes/noteRoute");
const app = express()
const dotenv = require("dotenv");
dotenv.config();


app.use(express.json());
app.use(cors());
app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.send("Crime Alert Api from Muhammad Ahsan bin Abdul Aziz");
});

app.listen(8080,()=>{
    console.log('listening on port 8080');
})
