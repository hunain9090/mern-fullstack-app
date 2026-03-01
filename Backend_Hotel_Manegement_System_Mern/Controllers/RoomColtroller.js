import RoomModel from "../Models/RoomModel.js";

const CreateRoom = async (req, res) => {
  try {
    let { roomName,roomNumber, roomDescription, roomType, roomStatus,roomPrice} = req.body;



    let roomImage=req.file.filename
    let existedRoom = await RoomModel.findOne({ roomNumber });

    if (existedRoom) {
      return res
        .status(401)
        .json({ success: false, message: `Room ${roomNumber} Already Exist` });
    }

    let newRoom = await RoomModel.create({
      roomName,
      roomNumber,
      roomDescription,
      roomType,
      roomStatus,
      roomPrice,
      roomImage
    });

    return res.status(201).json({ success: true, newRoom });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal Server Error : ${err}` });
  }
};

const showRooms = async (req, res) => {
  try {
    let user=req.user
    let roomsList = await RoomModel.find().populate("roomType").populate("roomStatus");

    if (roomsList.length==0) {
      return res.status(404).json({ success: true, message: "No Rooms Found" });
    }

    return res.status(200).json({ success: true, roomsList ,user});
  } catch (err) {
    return res
      .status(500)
      .json({ success: true, message: `Internal Server Error : ${err}` });
  }
};



const showRoomById=async(req,res)=>{

try{
let RoomId=req.params.id

let findRoomById=await RoomModel.findOne({_id:RoomId}).populate("roomType").populate("roomStatus")

if(!findRoomById){

return res.status(404).json({success:false,message:"  No Room Exist"})

}



return res.status(200).json({success:true,findRoomById})



}
catch(err){
return res.status(500).json({success:false,message:`Internal Server Error : ${err}`})


}


}
const showRoomsByType=async(req,res)=>{

try{
let RoomTypeId=req.params.Typeid

let findRoomByType=await RoomModel.find({roomType:RoomTypeId}).populate("roomType").populate("roomStatus")

if(findRoomByType.length==0){

return res.status(404).json({success:false,message:"  No Room Found"})

}



return res.status(200).json({success:true,findRoomByType})



}
catch(err){
return res.status(500).json({success:false,message:`Internal Server Error : ${err}`})


}


}



const updateRoom=async(req,res)=>{

try{

let upId=req.params.id

let findRoomById=await RoomModel.findOne({_id:upId})

if(!findRoomById){

return res.status(404).json({success:false,message:"Room DoesNot Exist"})

}


let { roomName,roomNumber, roomDescription, roomType, roomStatus,roomPrice} = req.body;

let roomImage=findRoomById.roomImage

if(req.file){
  roomImage=req.file.filename

}




await RoomModel.findByIdAndUpdate(upId,{roomName,roomNumber, roomDescription, roomType, roomStatus,roomPrice,roomImage})

let updatedRoom=findRoomById

return res.status(200).json({success:true,updatedRoom})


}catch(err){

return res.status(500).json({success:false,message:`Internal Server Error : ${err}`})

}

}



const deleteRooms = async (req, res) => {
  try {
    let RoomId = req.params.id;
    console.log(RoomId);
    let existedRoom = await RoomModel.findOne({ _id: RoomId });

    if (!existedRoom) {
      return res
        .status(404)
        .json({ success: false, message: "Room Does Not Exist" });
    }

    await RoomModel.findByIdAndDelete(RoomId);

    return res
      .status(200)
      .json({ success: true, message: "Room Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal Server Error : ${err}` });
  }
};

export { CreateRoom, showRooms,showRoomById, deleteRooms,updateRoom ,showRoomsByType};
