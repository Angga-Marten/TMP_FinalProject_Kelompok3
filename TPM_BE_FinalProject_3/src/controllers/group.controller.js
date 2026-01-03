import bcrypt from "bcrypt"; 
import { createGroup, findGroupName } from "../models/group.model.js";
import { validatePassword } from "../utils/password.helper.js";

const registerGroup = async (req, res) => {
    try{
        const { groupName, password, confirmPassword, isBinusian } = req.body;

        //check if fields are empty
        if(!groupName || !password || !confirmPassword || !isBinusian === undefined){
            return res.status(400).json({ message: "All fields are required!!"})
        }

        //check if both passwords are the same
        if(password !== confirmPassword){
            return res.status(400).json({ message: "Passwords do not match!!" });
        }

        //check if password follows guidelines
        const passwordError = validatePassword(password);
        if(passwordError){
            return res.status(400).json({ message: passwordError });
        }

        //check if dupe group names
        const existingGroup = await findGroupName(groupName);
        if(existingGroup) {
            return res.status(409).json({ message: "Group name already exists!!" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const groupId = await createGroup(
            groupName,
            passwordHash,
            isBinusian,
        );

        return res.status(201).json({
            message: "Group registered successfully!!",
            groupId,
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error :<" });
    }
}

export{
    registerGroup
}