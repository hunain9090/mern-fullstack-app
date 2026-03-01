import express from "express"
import * as roomController from "../Controllers/RoomColtroller.js"
import upload from "../MiddleWares/MulterSetup.js"
import isAdminAuthenticated from "../MiddleWares/adminAuth.js"

let RoomRouter=express.Router()

RoomRouter.post("/createroom",upload.single("roomImage"),roomController.CreateRoom)
RoomRouter.get("/showrooms",roomController.showRooms)
RoomRouter.get("/showroom/:id",roomController.showRoomById)
RoomRouter.delete("/deleteroom/:id",roomController.deleteRooms)
RoomRouter.put("/updateroom/:id",upload.single("roomImage"),roomController.updateRoom)
RoomRouter.get("/roomsbytype/:Typeid",roomController.showRoomsByType)


export default RoomRouter;