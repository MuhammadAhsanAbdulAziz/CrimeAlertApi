const express = require("express");
const { getFeedback, createFeedback, deleteFeedback, updateFeedback, getallFeedback } = require("../controllers/feedbackController");
const auth = require("../middleware/auth");
const feedbackRouter = express.Router();

feedbackRouter.get("/",auth, getFeedback);

feedbackRouter.get("/all",auth, getallFeedback);

feedbackRouter.post("/",auth, createFeedback);

feedbackRouter.delete("/:id",auth, deleteFeedback);

feedbackRouter.put("/:id",auth, updateFeedback);

module.exports = feedbackRouter;