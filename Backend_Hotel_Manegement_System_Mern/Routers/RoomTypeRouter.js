import express from "express"
import * as RoomTypeController from "../Controllers/RoomTypeController.js"


let roomTypeRouter=express.Router()

roomTypeRouter.post("/createtype",RoomTypeController.createType)
roomTypeRouter.get("/showtypes",RoomTypeController.showType)

export default roomTypeRouter