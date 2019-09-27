import {check} from "express-validator/check";
import { tranValidation } from "../../lang/en"

let updateWallet = [
    check("password", tranValidation.PASSWORD_INCORRECT)
        .isLength({min: 8})
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/),
    check("wallet", tranValidation.PASSWORD_INCORRECT)
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{32,}$/),
];

module.exports = {
    updateWallet: updateWallet
};