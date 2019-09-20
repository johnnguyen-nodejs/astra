import {check} from "express-validator/check";
import { tranValidation } from "../../lang/en"

let register = [
    check("email", tranValidation.EMAIL_INCORRECT)
        .isEmail()
        .trim(),
    check("password", tranValidation.PASSWORD_INCORRECT)
        .isLength({ min: 8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
    check("password_confirmation", tranValidation.PASSWORD_CONFIRM_INCORRECT)
        .custom((value, {req})=> value === req.body.password)
];

module.exports = {
    register: register
};
