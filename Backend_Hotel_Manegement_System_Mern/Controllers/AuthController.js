import bcrypt from "bcrypt";
import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


const signUp = async (req, res) => {
  try {
    let { userName, email, password, image } = req.body;

    let existedUser = await UserModel.findOne({ email });

    if (existedUser) {
      return res
        .status(401)
        .json({ success: false, message: "User Already Exist" });
    }

    // =====================new method for saving data Starts========

    let newUser = new UserModel({ userName, email, password, image });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    // =====================new method for saving data Ends========

    return res.status(201).json({ success: true, newUser });
  } catch (err) {
    console.log(`console error ${err}`);
    return res
      .status(500)
      .json({ success: false, message: `Internal Server Error : ${err.message}` });
  }
};

let fetchSignupUsers = async (req, res) => {
  try {
    let allUsers = await UserModel.find();

    if (!allUsers) {
      return res.status(404).json({ success: true, message: "No User Found" });
    }

    return res.status(200).json({ success: true, allUsers });
  } catch (err) {
    return res
      .status(500)
      .json({ success: true, message: `Internal Server Error : ${err}` });
  }
};


let fetchSignupUsersById = async (req, res) => {
    try {
        let userId =req.params.id;
        
        let singleUser = await UserModel.findOne({ _id: userId });
        
    if (!singleUser){
        return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    }    return res.status(200).json({ success: true, singleUser });
  } catch (err) {
    return res
      .status(500)
      .json({ success: true, message: `Internal Server Error : ${err}` });
    }
};



let updateSignupUser=async(req,res)=>{
try
{
let updateId=req.params.id

let existedUser=await UserModel.findOne({_id:updateId})

if(!existedUser){
  return res.status(404).json({success:false,message:"User Not Found"})
}

let { userName, email, password, image,role } = req.body;


await UserModel.findByIdAndUpdate(updateId,{userName,email,password,image,role})

let updatedUser=await UserModel.findOne({userName})

return res.status(200).json({success:true,updatedUser})

}
catch(err){
  return res.status(404).json({success:false,message:`Internal Server Error ${err}`})
}

}



let deleteUser=async(req,res)=>{

try{
let id=req.params.id
let existedUser=await UserModel.findOne({_id:id})

if(!existedUser){
  return res.status(404).json({success:false,message:"User Not Found"})
}

await UserModel.findByIdAndDelete({_id:id})

let newUserList=await UserModel.find()
return res.status(200).json({success:true,newUserList})


}catch(err){
  return res.status(500).json({success:false,message:err})

}

}



const loginUser=async(req,res)=>{

let{email,password}=req.body



let findUserByEmail=await UserModel.findOne({email})

let errMsg="Invalid Email Or Password"

if(!findUserByEmail){
return res.status(404).json({success:false,message:errMsg})

}

let isPassword=await bcrypt.compare(password,findUserByEmail.password)

if(!isPassword){
  return res.status(404).json({success:false,message:errMsg})
}


let jwtToken=jwt.sign(
{email:findUserByEmail.email,role:findUserByEmail.role,_id:findUserByEmail._id},
process.env.SECRET_KEY,
{expiresIn:"24h"}

)

return res.status(200).json({success:true,message:"loginSuccessfully",jwtToken,role:findUserByEmail.role})








}



export { signUp, fetchSignupUsers,fetchSignupUsersById,updateSignupUser,loginUser,deleteUser};