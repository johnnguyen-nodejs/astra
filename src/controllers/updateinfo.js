import multer from "multer";
import { appConfig } from "../config/appConfig";
import { tranErrors, tranSuccess } from "../../lang/vi";
import uuidv4 from "uuid/v4";
import {user} from "../services/index";
import fsExtra from "fs-extra";
import { validationResult } from "express-validator/check";

let storageAvatar = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, appConfig.avatar_dir )
    },
    filename: (req, file, callback)=> {
        let math = appConfig.avatar_type;
        if(math.indexOf(file.mimetype) === -1) {
            return callback(tranErrors.AVATAR_TYPE, null);
        };
        let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        callback(null, avatarName);
    },
});
let avatarUploadFile = multer({
    storage: storageAvatar,
    limits: {
        fileSize: appConfig.avatar_limit_size
    }
}).single("avatar");

let updateAvatar = (req, res)=> {
    avatarUploadFile(req, res,  async (error)=> {
        if(error) {
            if(error.message){
                console.log(error);
                return res.status(500).send(tranErrors.AVATAR_SIZE);
            }
            return res.status(500).send(error);
        }
        try {
            let updateUserItem = {
                avatar: req.file.filename,
                updatedAt: Date.now()
            };
            //update user avatar
            let userUpdate = await user.updateUser(req.user._id, updateUserItem);
            //remove old avatar
            await fsExtra.remove(`${appConfig.avatar_dir}/${userUpdate.avatar}`);
            let result = {
                message: tranSuccess.INFO_UPDATE_SUCCESS,
                imageSrc: `images/avatars/${req.file.filename}`
            };
            return res.status(200).send(result);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })
};

let updateInfo = async (req, res)=> {
    let errArr = [];
    let validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        return res.status(500).send(errArr);  
    };
    
    try {
        let updateUserItem = req.body;
        await user.updateUser(req.user._id, updateUserItem);
        let result = {
            message: tranSuccess.INFO_UPDATE_SUCCESS
        };
        return res.status(200).send(result); 
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    updateAvatar: updateAvatar,
    updateInfo: updateInfo
};