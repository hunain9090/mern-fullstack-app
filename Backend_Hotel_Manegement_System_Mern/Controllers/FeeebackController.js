import Booking from "../Models/Booking.js";
import FeedBack from "../Models/Feedback.js"


const createFeedback = async (req,res)=>{
    try{
   let {
    userId,
    bookingId,
    staffId,
    rating,
    comment,
    serviceRating,
    cleanlinessRating,
    comfortRating,
    valueForMoneyRating} = req.body


    await FeedBack.create({ userId,
        bookingId,
        staffId,
        rating,
        comment,
        serviceRating,
        cleanlinessRating,
        comfortRating,
        valueForMoneyRating})

         await Booking.findByIdAndUpdate(bookingId, { feedbackGiven: true });

        return res.status(201).json({success: true,message: "Feedback submitted successfully"})
    }
    catch(err){
        console.log(err);
        
        res.status(500).json({success: false,message: "Internal Server Error",err})
    }
}

const getAllFeedback = async (req,res)=>{
    try{
          const feedback =  await FeedBack.find().populate("userId","userName email").populate("staffId","fullname email roleinHotel").populate("bookingId")
    return res.status(200).json({success: true,feedback})
    }
    catch(err){
        res.status(500).json({success: false,message: "Internal Server Error",err})
    }
}

const getFeedbackByBookingId = async (req, res) => {
  try {
    const  id = req.params.id; 

    const feedback = await FeedBack.findOne({ bookingId: id })
      .populate("userId", "userName email")
      .populate("staffId", "fullname roleinHotel")
      .populate("bookingId");

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "No feedback found for this booking",
      });
    }

    res.status(200).json({
      success: true,
      feedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const deleteFeedback = async (req,res) =>{
   try {
    const id  = req.params.id;

    const feedback = await FeedBack.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export {
    createFeedback,getAllFeedback,deleteFeedback,getFeedbackByBookingId
}