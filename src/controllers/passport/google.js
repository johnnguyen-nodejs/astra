require('dotenv').config();
import passport from "passport";
import passportGoogle from "passport-google-oauth";
import UserModel from "./../../models/userModel";
import {tranErrors} from "./../../../lang/vi";

let GoogleStrategy = passportGoogle.OAuth2Strategy;

let ggId = process.env.GG_ID;
let ggSecret = process.env.GG_SECRET;
let ggCallbackbUrl = process.env.GG_CB_URL;
/**
 * Valid user account type: Facebook 
 */

let initPassportGoogle = () =>{
    passport.use(new GoogleStrategy({
        clientID: ggId,
        clientSecret: ggSecret,
        callbackURL: ggCallbackbUrl,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByGoogleUid(profile.id);
            if(user){
                return done(null, user);
            }
            let newUserItem = {
                username: profile.displayName,
                local: {
                    isActive: true
                },
                google: {
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

module.exports = initPassportGoogle;
