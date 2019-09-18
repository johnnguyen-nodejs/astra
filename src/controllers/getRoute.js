import {register, verifyAccount} from "./register";
import {updateAvatar, updateInfo } from "./updateInfo";

let getHome = (req, res)=>{
    res.render("index", {
        title: "homepage",
        user: req.user
    });
};

let getNotFound = (req, res)=>{
    res.render("404", {
        title: "Page Not Found",
        user: req.user
    });
};

let getDashboard = (req, res)=>{
        res.render("dashboard", {
            title: "dashboard",
            user: req.user          
        });
    };

let getAuth = (req, res)=>{
        res.render("auth/auth", {
            title: "Authenticate",
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user
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
    checkLogedOut: checkLogedOut,
    updateAvatar: updateAvatar,
    updateInfo: updateInfo
};
