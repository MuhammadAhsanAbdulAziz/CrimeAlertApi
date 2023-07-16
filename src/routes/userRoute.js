const express = require("express");
const { signup, signin,getUser,updateUser,deleteUser,getallUser,updateRoleUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/signin",signin);
userRouter.get("/",auth,getUser);
userRouter.get("/all",auth,getallUser);
userRouter.put("/:id",auth, updateUser);
userRouter.put("/role/:id",auth, updateRoleUser);
userRouter.delete("/:id",auth, deleteUser);


module.exports = userRouter;