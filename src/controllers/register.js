import { validationResult } from "express-validator/check";

let register = (req, res)=>{
    let errArr = [];
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        return;  
    };
};

module.exports = register;
