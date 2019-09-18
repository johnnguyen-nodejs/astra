import {check} from "express-validator/check";
import { tranValidation } from "../../lang/vi"

let updateInfo = [
    check("username", tranValidation.UPDATE_USERNAME)
        .optional()
        .isLength({min: 3 , max: 20})
        .matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("address", tranValidation.UPDATE_ADDRESS)
        .optional()
        .isLength({min:3, max: 20}),
    check("phone", tranValidation.UPDATE_PHONE)
        .optional()
        .matches(/^(0)[0-9]{9-10}$/),   
];

module.exports = {
    updateInfo: updateInfo
};