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
        return res.redirect("/register");  
    };
<<<<<<< HEAD
    if (!req.body.parent && !parent) {
=======
    if (!req.body.parent) {
>>>>>>> 72cb4c9668d08f524ec7f1241c39ae839e102db3
        try {
            let userCreateSuccess = await auth.register(req.body.email, req.body.password, process.env.ADMIN_REF, req.protocol, req.get("host"));
            successArr.push(userCreateSuccess);
            req.flash("success", successArr);
            return res.redirect("/register");
        } catch (error) {
            errArr.push(error);
            req.flash("errors", errArr);
            return res.redirect("/register");
        };
<<<<<<< HEAD
    } else if(parent){
        try {
            let userCreateSuccess = await auth.register(req.body.email, req.body.password, req.query.refferer, req.protocol, req.get("host"));
            successArr.push(userCreateSuccess);
            req.flash("success", successArr);
            return res.redirect("/register");
        } catch (error) {
            errArr.push(error);
            req.flash("errors", errArr);
            return res.redirect("/register");
        };
=======
>>>>>>> 72cb4c9668d08f524ec7f1241c39ae839e102db3
    } else {
        try {
            let userCreateSuccess = await auth.register(req.body.email, req.body.password, req.body.parent, req.protocol, req.get("host"));
            successArr.push(userCreateSuccess);
            req.flash("success", successArr);
            return res.redirect("/register");
        } catch (error) {
            errArr.push(error);
            req.flash("errors", errArr);
            return res.redirect("/register");
        };
    }
      
};
let verifyAccount = async (req, res) =>{
    let errArr = [];
    let successArr = [];

    try {
        let verifySuccess = await auth.verifyAccount(req.params.token);
        successArr.push(verifySuccess);
        req.flash("success", successArr);
        return res.redirect("/login");
    } catch (error) {
        errArr.push(error);
        req.flash("errors", errArr);
        return res.redirect("/register");
    }
};
module.exports = {
    register: register,
    verifyAccount: verifyAccount
};
