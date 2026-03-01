import mongoose from "mongoose";


const roomStatusSchema=mongoose.Schema({

status:{
    type:String,
    required:true,
    default:"available"
}

})


const roomStatusModel=mongoose.model("RoomStatus",roomStatusSchema)

export default roomStatusModel