import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()

const isAdminAuthenticated=(req,res,next)=>{

try{
    let token=req.headers["authorization"]

if(!token){
    return res.status(403).json({success:false,message:"token is required"})
}


let decodedData=jwt.verify(token,process.env.SECRET_KEY)

if(decodedData.role=="user"){
 req.user=decodedData
next()
}else{
    return res.status(403).json({success:false,message:"this operation can only be performed by admin"})
}


}

catch(err){
    return res.status(403).json({success:false,message:"Invalid Or Expired Token"})
}

}



export default isAdminAuthenticated




