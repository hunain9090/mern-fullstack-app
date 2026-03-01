import dotenv from "dotenv"
import mongoose from "mongoose"


dotenv.config()


const ConnectToDb=async()=>{

    try
    {    
await mongoose.connect(process.env.DbUrl)
console.log("Database Connected Successfully")
}
catch(err){
    
    console.log(`Failed To Connect To Db : ${process.env.DbUrl}`)


}


}

export default ConnectToDb