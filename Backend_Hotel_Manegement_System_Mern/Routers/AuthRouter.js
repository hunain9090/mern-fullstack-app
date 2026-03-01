import express from "express"
import * as authController from "../Controllers/AuthController.js"


let authRouter=express.Router()

authRouter.post("/signup",authController.signUp)
authRouter.get("/showusers",authController.fetchSignupUsers)
authRouter.get("/showusers/:id",authController.fetchSignupUsersById)
authRouter.put("/updateusers/:id",authController.updateSignupUser)
authRouter.delete("/deleteuser/:id",authController.deleteUser)
authRouter.post("/login",authController.loginUser)



export default authRouter;


