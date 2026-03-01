import roomStatusModel from "../Models/RoomStatusModel.js"


const createRoomStatus=async(req,res)=>{
    try{
let {status}=req.body


let existedStatus=await roomStatusModel.findOne({status})

if(existedStatus){
    return res.status(404).json({success:false,message:`${status} Already Existed`}) 
}

let newStatus=await roomStatusModel.create({status})

return res.status(201).json({success:true,newStatus})





    }
    catch(err){

return res.status(500).json({success:false,message:`Internal Server Error : ${err}`}) 

    }
}



const showRoomStatus=async(req,res)=>{
try{
let statusList=await roomStatusModel.find()

if(!statusList){
    return res.status(404).json({success:false,message:"No Status available"})
}

return res.status(200).json({success:true,statusList})


}
catch(err){
return res.status(500).json({success:false,message:`Internal Server Error : ${err}`})
}



}


export {createRoomStatus,showRoomStatus}