import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const isUserAuthenticated=(req,res,next)=>{
try
{
    let token=req.headers["authorization"]

if(!token){
    return res.status(403).json({success:false,message:"Token Is Required"})
}

let decodedData=jwt.verify(token,process.env.SECRET_KEY)


if(decodedData.role=="user"){
req.user=decodedData

}else{
   
return res.status(403).json({success:false,message:"This Operation Can Only Be Perform By User"})    

}
}catch(err){
    return res.status(403).json({success:false,message:"Invalid Or Expired Token"})

}



}


export default isUserAuthenticated



