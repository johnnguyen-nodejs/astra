import UserModel from "./../models/userModel";
import { tranErrors } from "../../lang/en";
import bcrypt from "bcrypt";

const saltRounds = 7;
/**
 * 
 * @param {userId} id 
 * @param {data update} item 
 */
let updateUser = (id, item) => {
    return UserModel.updateUser(id, item);
}

/**
 * update password
 * @param {userId} id 
 * @param {data update} dataUpdate 
 */
let updatePassword = (id, dataUpdate) => {
    return new Promise(async (resolve, reject)=> {
        let currentUser = await UserModel.findUserById(id);
        if(!currentUser) {
            return reject(tranErrors.ACCOUNT_NOT_EXIST);
        }
        let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword);
        if(!checkCurrentPassword) {
            return reject(tranErrors.CHECK_CURRENT_PASS_FAILED);
        }

        let salt = bcrypt.genSaltSync(saltRounds);
        await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt));
        resolve(true);
    });
}
/**
 * update password
 * @param {userId} id 
 * @param {data update} dataUpdate 
 */
let updateWallet = (id, dataUpdate) => {
    return new Promise(async (resolve, reject)=> {
        let currentUser = await UserModel.findUserById(id);
        if(!currentUser) {
            return reject(tranErrors.ACCOUNT_NOT_EXIST);
        }
        let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.password);
        if(!checkCurrentPassword) {
            return reject(tranErrors.CHECK_CURRENT_PASS_FAILED);
        }
        if(currentUser.wallet !== "0x0"){
            return reject(tranErrors.WALLET_ALREADY_UPDATED);
        }
        await UserModel.updateWallet(id, dataUpdate.wallet);
        resolve(true);
    });
}

module.exports = {
    updateUser: updateUser,
    updatePassword: updatePassword,
    updateWallet: updateWallet
};
