import express from "express";
import * as MaintainanceRequestController from "../Controllers/MaintainanceRequestController.js";


let MaintainanceRequestRouter=express.Router()

MaintainanceRequestRouter.post("/servicerequest", MaintainanceRequestController.createRequest);
MaintainanceRequestRouter.get("/showrequest", MaintainanceRequestController.showRequests);
MaintainanceRequestRouter.put("/updaterequest/:id", MaintainanceRequestController.updateRequestStatus);
MaintainanceRequestRouter.delete("/deleterequest/:id", MaintainanceRequestController.deleteRequest);


export default MaintainanceRequestRouter