import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    phone: {
        type: Number,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: "user"
    },
    local: {
        email: {
            type: String,
            trim: true
        },
        password: String,
        isActive: {
            type: Boolean,
            default: false
        },
        verifyToken: String
    },
    facebook: {
        uid: String,
        token: String,
        email: {
            type: String,
            trim: true
        }
    },
    google: {
        uid: String,
        token: String,
        email: {
            type: String,
            trim: true
        }
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: Date.now}
});

UserSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    findByEmail(email){
        return this.findOne({"local.email": email}).exec();
    },
    findUserById(id){
        return this.findById(id).exec();
    },
    removeById(id){
        return this.findByIdAndRemove(id).exec();
    },
    findByToken(token){
        return this.findOne({"local.verifyToken": token}).exec();
    },
    verifyUser(token){
        return this.findOneAndUpdate(
            {"local.verifyToken": token},
            {"local.isActive": true, "local.verifyToken": null}
        ).exec();
    },
    findByFacebookUid(uid){
        return this.findOne({"facebook.uid": uid}).exec();
    },   
    findByGoogleUid(uid){
        return this.findOne({"google.uid": uid}).exec();
    }   
};

UserSchema.methods = {
    comparePassword(password){
        return bcrypt.compare(password, this.local.password);
    }
};

module.exports = mongoose.model("user", UserSchema);
