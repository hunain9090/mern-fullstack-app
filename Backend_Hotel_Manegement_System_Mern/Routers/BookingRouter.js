import * as BookingController from '../Controllers/bookingController.js'
import express from 'express'

const bookingRouter =  express.Router()

bookingRouter.post("/",BookingController.createBooking )
bookingRouter.get("/", BookingController.fetchBookings )
bookingRouter.get("/:id", BookingController.fetchBookingyById)
bookingRouter.get("/mybookings/:id", BookingController.fetchBookingyByUserId)
bookingRouter.put("/:id", BookingController.updateBooking)
bookingRouter.delete("/:id",BookingController.deleteBooking)


export default bookingRouter