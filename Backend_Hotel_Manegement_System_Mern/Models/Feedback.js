import mongoose from "mongoose";

let feebackSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    staffId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: false,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        required: true
      },

      serviceRating: Number,
      cleanlinessRating: Number,
      comfortRating: Number,
      valueForMoneyRating: Number,
    
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      },
    
},{timestamps: true});

 const FeedBack = mongoose.model("Feedback",feebackSchema);

 export default FeedBack;