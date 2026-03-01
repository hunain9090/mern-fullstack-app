import * as ContactController from "../Controllers/ContactController.js"
import express from "express"

 let contactRouter = express.Router()

 contactRouter.post("/",ContactController.createContact)
 contactRouter.get("/",ContactController.fetchContact)
 contactRouter.delete("/:id",ContactController.deleteContact)

 export default contactRouter;
   