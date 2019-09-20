require('dotenv').config();
import passport from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "./../../models/userModel";
import {tranErrors} from "../../../lang/en";

let FacebookStrategy = passportFacebook.Strategy;

let fbId = process.env.FB_ID;
let fbSecret = process.env.FB_SECRET;
let fbCallbackbUrl = process.env.FB_CB_URL;
/**
 * Valid user account type: Facebook 
 */

let initPassportFacebook = () =>{
    passport.use(new FacebookStrategy({
        clientID: fbId,
        clientSecret: fbSecret,
        callbackURL: fbCallbackbUrl,
        passReqToCallback: true,
        profileFields: ["email", "displayName"]
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByFacebookUid(profile.id);
            if(user){
                return done(null, user);
            }
            let newUserItem = {
                username: profile.displayName,
                local: {
                    isActive: true
                },
                facebook: {
                    uid: profile.id,
                    token: accessToken,
                    email: profile.emails[0].value
                }
            };
            let newUser = await UserModel.createNew(newUserItem);
            return done(null, newUser);
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
                    return done(error. null);
                }
            );
    });
};

module.exports = initPassportFacebook;
