import UserModel from "./../models/userModel";
import bcrypt from "bcrypt";
import uuidv4 from "uuid/v4";
import { tranErrors, tranSuccess, tranMail } from "./../../lang/vi";
import sendMail from "./../config/mailer";

let saltRounds = 7;
let register = async (email, password, protocol, host) => {
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
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;
        //send email
        sendMail(email , tranMail.SUBJECT, tranMail.TEMPLATE(linkVerify))
        .then((success) => {
            resolve(tranSuccess.register_success(user.local.email));
        })
        .catch(async (error) => {
            await UserModel.removeById(user._id);
            console.log(error);
            reject(tranMail.SEND_FAILED);
        });
        resolve(tranSuccess.register_success(user.local.email));
    });
};

let verifyAccount = (token) => {
    return new Promise( async (resolve, reject) => {
        let userByToken = await UserModel.findByToken(token);
        if(!userByToken){
            return reject(tranErrors.TOKEN_NULL);
        };
        await UserModel.verifyUser(token);
        resolve(tranSuccess.ACCOUNT_ACTIVE);
    });
};

module.exports = {
    register: register,
    verifyAccount: verifyAccount
};
