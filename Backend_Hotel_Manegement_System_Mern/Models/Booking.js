import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rooms",
    required: false
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  phoneNumber: {
  type: String
},
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },

checkIn_OutStatus:{
  type:String,
  enum:["Not Yet","Check In","Check Out"],
  default:"Not Yet"
},
 feedbackGiven: {
        type: Boolean,
        default: false 
    }


},{timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking


