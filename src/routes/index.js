import express from "express";
import {
    getHome, 
    getTeam, 
    getContact, 
    getNotFound,
    getDashboard, 
<<<<<<< HEAD
=======
    getAdmin, 
>>>>>>> 72cb4c9668d08f524ec7f1241c39ae839e102db3
    getRegister,
    getLogin,
    postRegister,
    verifyAccount,
    getLogout,
    checkLogedIn,
    checkLogedOut,
    updateAvatar,
    updateInfo,
    updatePassword,
    updateWallet
} from "../controllers/getRoute";
import { authValid, userValid, passValid, walletValid } from "../validation/index";
import passport from "passport";
import {initPassportLocal, getGeetest, postGeetest } from "./../controllers/passport/local";
import initPassportFacebook from "./../controllers/passport/facebook";
import initPassportGoogle from "./../controllers/passport/google";

// Init all passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();
let router = express.Router();
/**
 * init routes 
 */
let initRouter = (app)=>{
    router.get('/geetest', getGeetest);
    router.post('/geetest', postGeetest);
    router.get('/', getHome );
    router.get('/team', getTeam );
    router.get('/contact', getContact );
    router.get('/404', getNotFound );
    router.get('/dashboard', checkLogedIn, getDashboard );
<<<<<<< HEAD
=======
    router.get('/admin', checkLogedIn, getAdmin );
>>>>>>> 72cb4c9668d08f524ec7f1241c39ae839e102db3
    router.get('/register', checkLogedOut, getRegister );
    router.get('/login', checkLogedOut, getLogin );
    router.get('/verify/:token', checkLogedOut, verifyAccount );
    router.post('/register', checkLogedOut, authValid.register, postRegister);
    router.post('/login', checkLogedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }) );
    router.get("/auth/facebook", passport.authenticate("facebook", {scope: ["email"]}));
    router.get("/auth/facebook/callback", passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    router.get("/auth/google", passport.authenticate("google", {scope: ["email"]}));
    router.get("/auth/google/callback", passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    router.get('/logout', checkLogedIn, getLogout);
    router.put('/user/update-avatar', checkLogedIn, updateAvatar);
    router.put('/user/update-info', checkLogedIn, userValid.updateInfo, updateInfo);
    router.put('/user/update-password', checkLogedIn, passValid.updatePassword, updatePassword);
    router.put('/user/update-wallet', checkLogedIn, walletValid.updateWallet, updateWallet);

    router.get('*', function(req, res){
        res.redirect("/404");
      });
    app.use("/", router);
};
module.exports = initRouter;

