import {register, verifyAccount} from "./register";
import {updateAvatar, updateInfo, updatePassword, updateWallet } from "./updateInfo";
import UserModel from "./../models/userModel";
import {live, contract, abi, deployed_at } from "./../hook/app";
var result = [];
var t = 0;
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
    function viewAll(refferer , invester, saveinvester, cb){
        t++
        if (t == saveinvester) {cb(result)}
        if (invester >0 ) {
            UserModel.find({'parent': refferer},'local.email phone address balance refferer invester revenue',function (err, res) {
                for (var i=0; i<res.length; i++){
                    result.push({
                        email : res[i].local.email,
                        phone: res[i].phone,
                        address: res[i].address,
                        balance: res[i].balance,
                        invester: res[i].invester,
                        revenue: res[i].revenue
                    });
                    viewAll(res[i].refferer, invester-1 , saveinvester ,cb);
                }
            });
        }
    }
    viewAll(req.user.refferer , req.user.invester + 1 , req.user.invester + 1  ,(listUser)=>{
        res.render("dashboard/user-dashboard", {
            title: "Dashboard",
            user: req.user,
            refferer: `${req.protocol}://${req.get("host")}/register?refferer=${req.user.refferer}`,
            totalAddress: process.env.ADMIN_ADDRESS,
            srcAddress: srcAddress,
            listUser: listUser
        });
      });
    
    if(req.user.wallet != ''){
        live(contract(abi,deployed_at), req.user.address, process.env.ADMIN_ADDRESS , async (event) => {
                var amount = event.result.value/10**(-18);
                UserModel.Deposit(req.user.address, amount);
        });
    }
    
    let srcAddress = `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${process.env.ADMIN_ADDRESS}&choe=UTF-8`
        
};
let getAdmin = (req, res)=>{
        res.render("dashboard/admin-dashboard", {
            title: "Admin Dashboard",
            user: req.user          
        });
    };

let getRegister = (req, res)=>{
        res.render("authentication/register", {
            title: "Register",
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user,
            parent: req.query.refferer
        });
    };
let getLogin = (req, res)=>{
        res.render("authentication/login", {
            title: "Login",
            errors: req.flash("errors"),
            success: req.flash("success"),
            user: req.user
        });
    };

let getLogout = (req, res) => {
    req.logout();
    return res.redirect("/login");
};

let checkLogedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return res.redirect("/login");
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
<<<<<<< HEAD
=======
    getAdmin: getAdmin,
>>>>>>> 72cb4c9668d08f524ec7f1241c39ae839e102db3
    getRegister: getRegister,
    getLogin: getLogin,
    postRegister: register,
    verifyAccount: verifyAccount,
    getLogout: getLogout,
    checkLogedIn: checkLogedIn,
    checkLogedOut: checkLogedOut,
    updateAvatar: updateAvatar,
    updateInfo: updateInfo,
    updatePassword: updatePassword,
    updateWallet: updateWallet
};
