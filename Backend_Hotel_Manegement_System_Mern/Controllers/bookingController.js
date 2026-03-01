import SendEmail from "../EmailIntegration/Email.js";
import Booking from "../Models/Booking.js";

const createBooking = async (req, res) => {
  try {
    let {
      checkInDate,
      checkOutDate,
      totalPrice,
      phoneNumber,
      status,
      userId,
      roomId,
      to,
      subject,
      body,
    } = req.body;

const newCheckIn = new Date(checkInDate);
const newCheckOut = new Date(checkOutDate);

    const existingBooking = await Booking.findOne({
      roomId,
      status: { $in: ["pending", "confirmed"] },
      checkInDate: { $lt: newCheckOut },
      checkOutDate: { $gt: newCheckIn },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This room is already booked On These Dates!",
      });
    }

    const booking = await Booking.create({
      checkInDate,
      checkOutDate,
      totalPrice,
      phoneNumber,
      status,
      userId,
      roomId,
    });

    SendEmail(to, subject, body);

    return res
      .status(201)
      .json({ success: true, message: "Room booked successfully", booking });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal Server error : ${err}` });
  }
};

const fetchBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").populate("roomId");
    return res.status(200).json({ success: true, bookings });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: err });
  }
};

const fetchBookingyById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    return res.status(200).json({ success: true, booking });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: err });
  }
};
const fetchBookingyByUserId = async (req, res) => {
  try {
    const fetchUserId = req.params.id;

    const booking = await Booking.find({ userId: fetchUserId })
      .populate("userId")
      .populate("roomId");
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "No Bookings Found" });
    }

    return res.status(200).json({ success: true, booking });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal Server error ${err}` });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const existedBooking = await Booking.findOne({ _id: bookingId });

    if (!existedBooking) {
      return res
        .status(404)
        .json({ success: false, message: `Booking doesnot exists` });
    }

    const {
      checkInDate,
      checkOutDate,
      totalPrice,
      phoneNumber,
      status,
      checkIn_OutStatus,
    } = req.body;

    await Booking.findByIdAndUpdate(bookingId, {
      checkInDate,
      checkOutDate,
      totalPrice,
      phoneNumber,
      status,
      checkIn_OutStatus,
    });

    const updatedBooking = await Booking.findOne({ _id: bookingId });

    return res
      .status(200)
      .json({
        success: true,
        updated_booking: updatedBooking,
        message: `Booking Updated Successfully`,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: err });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const existedBooking = await Booking.findOne({ _id: bookingId });

    if (!existedBooking) {
      return res
        .status(404)
        .json({ success: false, message: `Booking doesnot exists` });
    }

    await Booking.findByIdAndDelete(bookingId);

    return res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error", error: err });
  }
};

export {
  createBooking,
  fetchBookings,
  fetchBookingyById,
  updateBooking,
  deleteBooking,
  fetchBookingyByUserId,
};
