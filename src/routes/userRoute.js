const express = require("express");
const { signup, signin,getUser,updateUser,deleteUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/signin",signin);
userRouter.get("/",auth,getUser);
userRouter.put("/:id",auth, updateUser);
userRouter.delete("/:id",auth, deleteUser);


module.exports = userRouter;