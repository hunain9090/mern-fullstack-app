import * as FeedBackController from "../Controllers/FeeebackController.js"
import express from "express"

 let feedbackRouter = express.Router()

 feedbackRouter.post("/",FeedBackController.createFeedback)
 feedbackRouter.get("/",FeedBackController.getAllFeedback)
 feedbackRouter.get("/:id", FeedBackController.getFeedbackByBookingId)
 feedbackRouter.delete("/:id",FeedBackController.deleteFeedback)

 export default feedbackRouter;
   