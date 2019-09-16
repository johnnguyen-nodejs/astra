import {register, verifyAccount} from "./register";
import { tranSuccess } from "./../../lang/vi";

let getHome = (req, res)=>{
        res.render("index", {title: "homepage"});
    };

let getNotFound = (req, res)=>{
    res.render("404", {title: "Page Not Found"});
};

let getDashboard = (req, res)=>{
        res.render("dashboard", {
            title: "dashboard"          
        });
    };

let getAuth = (req, res)=>{
        res.render("auth/auth", {
            title: "Authenticate",
            errors: req.flash("errors"),
            success: req.flash("success")
        });
    };

let getLogout = (req, res) => {
    req.logout();
    return res.redirect("/auth");
};

let checkLogedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/auth");
    };
    next();
};

let checkLogedOut = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect("/404");
    };
    next();
};

module.exports = {
    getHome: getHome,
    getNotFound,
    getDashboard: getDashboard,
    getAuth: getAuth,
    postRegister: register,
    verifyAccount: verifyAccount,
    getLogout: getLogout,
    checkLogedIn: checkLogedIn,
    checkLogedOut: checkLogedOut
};
