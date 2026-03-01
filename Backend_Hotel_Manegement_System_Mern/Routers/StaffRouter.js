import * as StaffController from '../Controllers/StaffController.js'
import express from 'express'
import upload from "../MiddleWares/MulterSetup.js"

const staffRouter =  express.Router()

staffRouter.post("/signup",upload.single("profileimg"),StaffController.createStaff)
staffRouter.post("/login",StaffController.stafflogin)
staffRouter.get("/", StaffController.fetchStaff )
staffRouter.get("/:id", StaffController.fetchStaffById)
staffRouter.put("/:id",upload.single("profileimg"),StaffController.updateStaff)
staffRouter.delete("/:id",StaffController.deleteStaff)
// Approve staff
staffRouter.put("/approve/:id", async (req, res) => {
  try {
    const staff = await StaffController.updateStaffStatus(req.params.id, "approved");
    res.status(200).json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Reject staff
staffRouter.put("/reject/:id", async (req, res) => {
  try {
    const staff = await StaffController.updateStaffStatus(req.params.id, "rejected");
    res.status(200).json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default staffRouter