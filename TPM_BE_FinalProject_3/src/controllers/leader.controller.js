import {
  createLeader,
  findLeaderEmail,
  findLeaderLineId,
  findLeaderWhatsapp
} from "../models/leader.model.js";
import { pool } from "../config/database.js";

const allowedFileTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

const isAtLeast17 = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if(m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 17;
};

const registerLeader = async (req, res) => {
  try {
    const {
      fullName,
      email,
      whatsappNumber,
      lineId,
      githubId,
      birthPlace,
      birthDate,
      isBinusian 
    } = req.body;

    const { cvFile, flazzFile, idCardFile } = req.files || {};

    //To get the object inside the array
    const cv = cvFile?.[0];       
    const flazz = flazzFile?.[0]; 
    const idCard = idCardFile?.[0]; 

    const [rows] = await pool.query(
      "SELECT id_group FROM user_groups ORDER BY created_at DESC LIMIT 1"
    );
    if(!rows.length) return res.status(404).json({ message: "No group exists yet!!" });

    const idGroup = rows[0].id_group;
    
    if(!idGroup || !fullName || !email || !whatsappNumber || !lineId || !birthPlace || !birthDate) {
      return res.status(400).json({ message: "All required fields must be filled!!" });
    }

    if(!email.includes("@")) return res.status(400).json({ message: "Invalid email format!!" });
    if(await findLeaderEmail(email)) return res.status(409).json({ message: "Email already registered!!" });

    if(whatsappNumber.length < 9) return res.status(400).json({ message: "Whatsapp number must be at least 9 digits!!" });
    if(await findLeaderWhatsapp(whatsappNumber)) return res.status(409).json({ message: "Whatsapp number already registered!!" });

    if(await findLeaderLineId(lineId)) return res.status(409).json({ message: "LINE ID already registered!!" });

    if(!isAtLeast17(birthDate)) return res.status(400).json({ message: "Leader must be at least 17 years old!!" });

    //give clear error messages
    if(!cv || !allowedFileTypes.includes(cv.mimetype)) {
      return res.status(400).json({ message: "CV file is required and must be pdf/jpg/jpeg/png!!" });
    }

    if(isBinusian && (!flazz || !allowedFileTypes.includes(flazz.mimetype))) {
      return res.status(400).json({ message: "Flazz card is required for Binusian!!" });
    }

    if(!isBinusian && (!idCard || !allowedFileTypes.includes(idCard.mimetype))) {
      return res.status(400).json({ message: "ID card is required for Non-Binusian!!" });
    }

    const leaderId = await createLeader({
      idGroup,
      fullName,
      email,
      whatsappNumber,
      lineId,
      githubId,
      birthPlace,
      birthDate,
      cvPath: cv.path,            
      flazzPath: flazz?.path || null,
      idCardPath: idCard?.path || null
    });

    return res.status(201).json({
      message: "Leader registered successfully!!",
      leaderId
    });

  } catch(error) {
    if(error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(404).json({ message: "Group not found :<" });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error :<" });
  }
};

export { 
  registerLeader 
};