import mongoose from "mongoose";


let roomTypeSchema=mongoose.Schema({

typeRoom:{
    type:String,
    required:true
}

})


let RoomTypeModel=mongoose.model("RoomType",roomTypeSchema)


export default RoomTypeModel
