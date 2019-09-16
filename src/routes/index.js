import express from "express";
import {
    getHome, 
    getDashboard, 
    getAuth,
    postRegister,
    verifyAccount
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
    router.get('/dashboard', getDashboard );
    router.get('/auth', getAuth );
    router.get('/verify/:token', verifyAccount );
    router.post('/register', authValid.register, postRegister);
    router.post('/login', passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth",
        successFlash: true,
        failureFlash: true
    }));
    app.use("/", router);
};
module.exports = initRouter;

