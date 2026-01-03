import multer from "multer";
import path from "path";
import fs from "fs";

//Save files in disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check if file path exists
    const uploadDir = "uploads/leaders";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    //saves file in directory
    cb(null, uploadDir); 
  },
  //Gives name
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  }
});

//Stops files with the wrong type from being saved
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else{
    cb(new Error("Invalid file type. Only pdf, jpg, jpeg, png are allowed!!"), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024 
  // 5MB max
};

const upload = multer({
  storage,
  fileFilter,
  limits
});

export default upload;
