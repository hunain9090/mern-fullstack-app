import multer from "multer";

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads");
  },
filename:(req, file, callback) => {
    callback(null, Date.now()+"_"+file.originalname);
  },

});


const upload=multer({
    storage:storage
})


export default upload
