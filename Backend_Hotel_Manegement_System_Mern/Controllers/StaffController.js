import Staff from "../Models/StaffModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const createStaff = async (req,res)=>{
try{
const  {fullname,email,password,phone,roleinHotel,status} = req.body
 const profileimg = req.file ? req.file.filename : null;

 let encryptedPassword = await bcrypt.hash(password, 10)

  const existedStaff = await Staff.findOne({email})
  if(existedStaff){
    return res.status(400).json({success:false, message: "Staff already exists with this email"})
  }

 let staff = await Staff.create({fullname,email,password: encryptedPassword,phone,roleinHotel,profileimg,status})

 return res.status(201).json({success:true, message: "Staff Booked Successfully",staff})
}
catch(err){
    return res.status(500).json({ success: false, message: "Internal Server error", error: err })
    }
    
}
const fetchStaff = async (req,res) => {
    try {
        const staff = await Staff.find();
        return res.status(200).json({ success: true, staff })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server error", error: err })
    }
}

const fetchStaffById = async (req, res) => {
    try {
        const staffId = req.params.id

        const staff = await Staff.findById(staffId);

        return res.status(200).json({ success: true, staff })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server error", error: err })
    }
}

const updateStaff = async (req, res) => {
    try {
        const staffId = req.params.id

        const existedstaff = await Staff.findOne({ _id: staffId })

        if (!existedstaff) {
            return res.status(404).json({ success: false, message: `Staff doesnot exists` })
        }

        
        const {fullname,email,password,phone,roleinHotel,status,joiningDate,shift} = req.body
         const profileimg = req.file.filename;
 
        await Staff.findByIdAndUpdate(staffId, {fullname,email,password,phone,roleinHotel,status,joiningDate,shift,profileimg});

        const updatedStaff = await Staff.findOne({_id: staffId})


        return res.status(200).json({ success: true, updated_staff: updatedStaff,message: `Staff Updated Successfully` })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server error", error: err })
    }
}
const deleteStaff =  async (req, res) => {
    try {
        const staffId = req.params.id

        const existedStaff = await Staff.findOne({ _id: staffId })

        if (!existedStaff) {
            return res.status(404).json({ success: false, message: `Staff doesnot exists` })
        }

        await Staff.findByIdAndDelete(staffId)

        return res.status(200).json({ success: true, message: "Staff deleted successfully" })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server error", error: err })
    }
}

const stafflogin = async (req, res) => {
    try {

        let { email, password } = req.body;

        const staff = await Staff.findOne({ email });

        let errMsg = "Incorrect email or password."

        if (!staff) {
            return res.status(403).json({ message: errMsg, success: false })
        }

        const isPasswordEqual = await bcrypt.compare(password, staff.password);

        if (!isPasswordEqual) {
            return res.status(403).json({ message: errMsg, success: false })
        }

        if (staff.status === "pending") {
            return res.status(403).json({
              success: false,
              message: "Your account is pending admin approval",
            });
          }
      
          
          if (staff.status === "rejected") {
            return res.status(403).json({
              success: false,
              message: "Your account has been rejected by admin",
            });
          }

        const jwtToken = jwt.sign(
            {name: staff.fullname,email: staff.email,role: staff.roleinHotel},
           process.env.SECRET_KEY,
            { expiresIn: "24h" }
        )

        return res.status(200).json({message: "Login Success", success: true, token: jwtToken})

    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server error", error: err })
    }
}
const updateStaffStatus = async (id, status) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return updatedStaff;
  } catch (err) {
    throw err;
  }
};
export {
    createStaff,fetchStaff,fetchStaffById,updateStaff,deleteStaff,stafflogin,updateStaffStatus
}

