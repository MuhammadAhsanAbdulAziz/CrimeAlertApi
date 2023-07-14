const express = require("express");
const { getFeedback, createFeedback, deleteFeedback, updateFeedback, getallFeedback,createFeedbackAnonymous } = require("../controllers/feedbackController");
const auth = require("../middleware/auth");
const feedbackRouter = express.Router();

feedbackRouter.get("/",auth, getFeedback);

feedbackRouter.get("/all",auth, getallFeedback);

feedbackRouter.post("/",auth, createFeedback);

feedbackRouter.post("/anonymous", createFeedbackAnonymous);

feedbackRouter.delete("/:id",auth, deleteFeedback);

feedbackRouter.put("/:id",auth, updateFeedback);

module.exports = feedbackRouter;