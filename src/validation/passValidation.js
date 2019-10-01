import {check} from "express-validator/check";
import { tranValidation } from "../../lang/en"

let updatePassword = [
    check("currentPassword", tranValidation.PASSWORD_INCORRECT)
        .isLength({min: 8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("newPassword", tranValidation.PASSWORD_INCORRECT)
        .isLength({min: 8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("confirmNewPassword", tranValidation.PASSWORD_CONFIRM_INCORRECT)
        .custom((value, {req}) => value === req.body.newPassword)
];

module.exports = {
    updatePassword: updatePassword
};