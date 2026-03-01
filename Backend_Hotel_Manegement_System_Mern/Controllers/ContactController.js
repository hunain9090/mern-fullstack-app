import Contact from "../Models/Contact.js";

const createContact = async (req,res)=>{
try{
    let {name,email,phone,city,message} = req.body
   const contact =  await Contact.create({name,email,phone,city,message})

   return res.status(201).json({success: true,message: "submitted Successfully",contact})
}
catch(err){
    return res.status(500).json({success: false, message: "Internal Server Error",error: err})
}
}

const fetchContact = async (req,res)=>{
    try{
   const contact = await Contact.find();
   return res.status(200).json({success: true, contact})
    }
  catch(err){
    return res.status(500).json({success: false, message: "Internal Server Error",error: err})
  }

}



const deleteContact = async (req, res) => {
  try {
    let contactId = req.params.id;
    console.log(contactId);
    let existedContact = await Contact.findOne({ _id: contactId });

    if (!existedContact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact Does Not Exist" });
    }

    await Contact.findByIdAndDelete(contactId);

    return res
      .status(200)
      .json({ success: true, message: "Contact Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal Server Error : ${err}` });
  }
};
export {
    createContact,fetchContact,deleteContact
} 