require('dotenv').config();
import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "./../../models/userModel";
import { tranErrors } from "../../../lang/en";
import Geetest from "gt3-sdk";

let LocalStrategy = passportLocal.Strategy;

/**
 * Valid user account type: local 
 */
var captcha = new Geetest({
    geetest_id: process.env.GEETEST_ID,
    geetest_key: process.env.GEETEST_KEY
});

let getGeetest = (req,res)=> {
    captcha.register(null, function (err, data) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!data.success) {
                req.session.failback = true;
                return res.send(data);
            } else {
                req.session.failback = false;
                return res.send(data);
            }
        });
};
let postGeetest = async (req,res) => {
    await captcha.validate(req.session.failback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
    }, function (err, success) {
        if (err) {
            return res.send({
                status: "error",
                info: err
            });
        } else if (!success) {
            return;
        } else {
            console.log('success');
        }
    }); 
};
let initPassportLocal = () =>{
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            let user = await UserModel.findByEmail(email);
            if(!user){
                return done(null, false, req.flash("errors", tranErrors.LOGIN_FAILED));
            };
            if(!user.local.isActive){
                return done(null, false, req.flash("errors", tranErrors.ACCOUNT_NOT_ACTIVE));
            }
            let checkPassword = await user.comparePassword(password);
            if(!checkPassword){
                return done(null, false, req.flash("errors", tranErrors.LOGIN_FAILED));
            }
            done(null, user);
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("errors", tranErrors.SERVER_ERR));
        }
    }));
    // Save userID to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
            .then(
                user => {
                    return done(null, user);
                }
            )
            .catch(
                error => {
                    return done(error, null);
                }
            );
    });
};

module.exports = {
    initPassportLocal: initPassportLocal,
    getGeetest: getGeetest,
    postGeetest: postGeetest
};
