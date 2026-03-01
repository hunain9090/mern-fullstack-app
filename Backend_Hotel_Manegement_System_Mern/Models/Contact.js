import mongoose from "mongoose";

  let ContactSchema = mongoose.Schema({
name:{
type: String,
require: true
},
email:{
    type:String,
    require:true
},
phone:{
    type:Number,
    require:true
},
city:{
    type:String,
    require:true
},
message:{
    type:String,
    require:true
}
},{timeStamps: true})

let Contact = mongoose.model("Contact",ContactSchema)

export default Contact;