import express from "express"
import dotenv from "dotenv"
import ConnectToDb from "./Config/ConnectToDb.js"
import authRouter from "./Routers/AuthRouter.js"
import RoomRouter from "./Routers/RoomRouter.js"
import roomTypeRouter from "./Routers/RoomTypeRouter.js"
import RoomStatusRouter from "./Routers/RoomStatusRouter.js"



import cors from "cors"

import bookingRouter from "./Routers/BookingRouter.js"
import staffRouter from "./Routers/StaffRouter.js"
import contactRouter from "./Routers/ContactRouter.js"
import MaintainanceRequestRouter from "./Routers/MaintainanceRequestRouter.js"
import feedbackRouter from "./Routers/FeedBackRouter.js"
dotenv.config()


let app=express()

app.use(express.json())
app.use(cors())
ConnectToDb()
app.use(express.static("public"))


app.get("/",(req,res)=>{

return res.json({message:"App Is Running"})

})


app.use(authRouter)
app.use("/rooms",RoomRouter)
app.use("/types",roomTypeRouter)
app.use("/roomstatus",RoomStatusRouter)
app.use("/booking",bookingRouter)
app.use("/staff",staffRouter)
app.use("/contact",contactRouter)
app.use("/feedback",feedbackRouter)
app.use("/request",MaintainanceRequestRouter)


app.listen(process.env.port,()=>{
console.log(`Server Is Running On ${process.env.port}`)

})