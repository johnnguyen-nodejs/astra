import {register, verifyAccount} from "./register";
import {updateAvatar, updateInfo, updatePassword } from "./updateInfo";

let getHome = (req, res)=>{
    res.render("index", {
        title: "Home",
        user: req.user
    });
};
let getTeam = (req, res)=>{
    res.render("team", {
        title: "Our Team",
        user: req.user
    });
};
let getContact = (req, res)=>{
    res.render("contact", {
        title: "Contact Us",
        user: req.user
    });
};

let getNotFound = (req, res)=>{
    res.render("404", {
        title: "Not Found",
        user: req.user
    });
};

let getDashboard = (req, res)=>{
        res.render("dashboard/user-dashboard", {
            title: "Dashboard",
            user: req.user          
        });
    };

let getAuth = (req, res)=>{
        res.render("auth", {
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
    getTeam: getTeam,
    getContact: getContact,
    getNotFound,
    getDashboard: getDashboard,
    getAuth: getAuth,
    postRegister: register,
    verifyAccount: verifyAccount,
    getLogout: getLogout,
    checkLogedIn: checkLogedIn,
    checkLogedOut: checkLogedOut,
    updateAvatar: updateAvatar,
    updateInfo: updateInfo,
    updatePassword: updatePassword
};
