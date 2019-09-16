import { validationResult } from "express-validator/check";
import { auth } from "./../services/index";

let register = async (req, res)=>{
    let errArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        let errors = Object.values(validationErrors.mapped());
        errors.forEach(item =>{
            errArr.push(item.msg);
        });
        req.flash("errors", errArr)
        return res.redirect("/auth");  
    };
    try {
        let userCreateSuccess = await auth.register(req.body.email, req.body.password);
        successArr.push(userCreateSuccess);
        req.flash("success", successArr);
        return res.redirect("/auth");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr)
        return res.redirect("/auth");
    };
    
};

module.exports = register;
