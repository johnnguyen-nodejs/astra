import {check} from "express-validator/check";
import { tranValidation } from "../../lang/en"

let agencyRegister = [
    check("fName", tranValidation.UPDATE_ADDRESS)
        .optional()
        .isLength({min:3, max: 20}),
    check("lName", tranValidation.UPDATE_ADDRESS)
        .optional()
        .isLength({min:3, max: 20}),
    check("address", tranValidation.UPDATE_ADDRESS)
        .optional()
        .isLength({min:3, max: 20}),
    check("phone", tranValidation.UPDATE_PHONE)
        .matches(/^[0-9]{9,12}$/),
];

module.exports = {
    agencyRegister: agencyRegister
};