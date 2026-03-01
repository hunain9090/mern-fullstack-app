import express from "express"
import * as RoomStatusController from "../Controllers/RoomStatusController.js"

let RoomStatusRouter=express.Router()


RoomStatusRouter.post("/createstatus",RoomStatusController.createRoomStatus)
RoomStatusRouter.get("/showstatus",RoomStatusController.showRoomStatus)



export default RoomStatusRouter;




