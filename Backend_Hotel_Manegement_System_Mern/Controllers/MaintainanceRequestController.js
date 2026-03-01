import serviceRequestModel from "../Models/MaintainanceRequestModel.js"


const createRequest=async(req,res)=>{
try{

let {bookingId,serviceType,message,status}=req.body
let newRequest=await serviceRequestModel.create({bookingId,serviceType,message,status})

return res.status(200).json({success:true,newRequest})

}catch(err){
    return res.status(500).json({success:false,message:`Internal Server Error : ${err}`})
}




}



const showRequests=async(req,res)=>{
try
{
    let requestList=await serviceRequestModel.find() .populate({
        path: "bookingId",
        populate: [
          {
            path: "userId",
            select: "userName email"
          },
          {
            path: "roomId",
            select: "roomName roomPrice"
          }
        ]
      });

if(requestList.length==0){
    return res.status(404).json({success:false,message:"No Requests Found"})
}

return res.status(200).json({success:true,requestList})
}catch(err){
    return res.status(500).json({success:false,message:`Internal Server Error : ${err}`})
}


}


const updateRequestStatus = async (req, res) => {
  try {
    let id  = req.params.id;
    let { status } = req.body;

    // allowed statuses
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    let updatedRequest = await serviceRequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Service Request not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      updatedRequest
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error : ${err}`
    });
  }
};



const deleteRequest = async (req, res) => {
  try {
    let id  = req.params.id;

    let deletedRequest = await serviceRequestModel.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({
        success: false,
        message: "Service Request not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service Request deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error : ${err}`
    });
  }
};







export {createRequest,showRequests,updateRequestStatus,deleteRequest}