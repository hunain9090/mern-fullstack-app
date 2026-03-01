import mongoose from "mongoose";

let RoomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  roomDescription: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true,
    
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true,
  },
  roomStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomStatus",
    required: true,
  },
  roomImage: {
    type: String,
    required: true,
  },
});


let RoomModel=mongoose.model("Rooms",RoomSchema)


export default RoomModel