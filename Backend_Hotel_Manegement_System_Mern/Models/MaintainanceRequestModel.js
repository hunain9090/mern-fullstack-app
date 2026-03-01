import mongoose from "mongoose";

const SeviceRequestSchema = mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Booking",
    required: true,
  },


  serviceType: {
    type: String,
    enum: ["Cleaning", "Pick & Drop", "Maintance"],
  },
message:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:["Pending","Approved","Rejected"],
    required:true,
    default:"Pending"
},


}


);


let serviceRequestModel=mongoose.model("ServiceRequest",SeviceRequestSchema)


export default serviceRequestModel
