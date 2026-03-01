import mongoose from "mongoose";

let staffSchema = mongoose.Schema({
     fullname:{
     type:String,
     required: true
    },
    email:{
    type: String,
    require: true
    },
    password:{
     type: String,
     require: true,
    },
    phone:{
        type:String,
        required: true
    },
    roleinHotel:{
    type: String,
    enum: ['receptionist','manager','housekeeping','admin'],
    required: true
    },
    status: {
        type: String,
        enum:["pending","approved","rejected"],
        required: true,
        default:"pending"
    },
    joiningDate:{
        type: Date,
        
        default:Date.now()
    },
    shift:{
        type: String,
        enum:['morning','evening','night'],
        default: 'morning',
    },
    profileimg:{
        type: String,
        default: 'staff.png'
    }
},{timeStamps: true});

  const Staff = mongoose.model("Staff",staffSchema)

  export default Staff;