import RoomTypeModel from "../Models/RoomTypeModl.js"


const createType=async(req,res)=>{
try
{
    let {typeRoom}=req.body

let existedType=await RoomTypeModel.findOne({typeRoom})

if(existedType){
    return res.status(401).json({success:true,message:"Type Already Exist"})
}

let newType=await RoomTypeModel.create({typeRoom})

return res.status(201).json({success:true,newType})

}catch(err){
   return res.status(500).json({success:false,message:`Internal Server Error ${err}`}) 
}

}


const showType=async(req,res)=>{

try{

let roomTypeList=await RoomTypeModel.find()

if(!roomTypeList){
    return res.status(404).json({success:false,message:"No Types available"})
}

return res.status(200).json({success:true,roomTypeList})


}catch(err){
return res.status(500).json({success:false,message:`Internal Server Error : ${err}`})


}

}


export {createType,showType} 