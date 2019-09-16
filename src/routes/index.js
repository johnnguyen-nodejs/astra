import express from "express";
import {
    getHome, 
    getNotFound,
    getDashboard, 
    getAuth,
    postRegister,
    verifyAccount,
    getLogout,
    checkLogedIn,
    checkLogedOut
} from "../controllers/getRoute";
import { authValid } from "../validation/index";
import passport from "passport";
import initPassportLocal from "./../controllers/passport/local";

// Init all passport
initPassportLocal();

let router = express.Router();
/**
 * init routes 
 */
let initRouter = (app)=>{
    router.get('/', getHome );
    router.get('/404', getNotFound );
    router.get('/dashboard', checkLogedIn, getDashboard );
    router.get('/auth', checkLogedOut, getAuth );
    router.get('/verify/:token', checkLogedOut, verifyAccount );
    router.post('/register', checkLogedOut, authValid.register, postRegister);
    router.post('/login', checkLogedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth",
        successFlash: true,
        failureFlash: true
    }));
    router.get('/logout', checkLogedIn, getLogout);
    app.use("/", router);
};
module.exports = initRouter;

