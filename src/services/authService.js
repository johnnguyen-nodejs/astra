import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import { tranErrors, tranSuccess } from "./../../lang/vi";

let saltRounds = 7;
let register = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await UserModel.findByEmail(email);
        if(userByEmail){
            if(!userByEmail.local.isActive){
                return reject(tranErrors.ACCOUNT_NOT_ACTIVE);
            };
            return reject(tranErrors.ACCOUNT_IN_USE);
        };
        let salt = bcrypt.genSaltSync(saltRounds);
        let userItem = {
            username: email.split("@")[0],
            local: {
                email: email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        };
        let user = await UserModel.createNew(userItem);
        resolve(tranSuccess.register_success(user.local.email));
    });
};

module.exports = {
    register: register
};
