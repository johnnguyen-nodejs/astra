import mongoose from "mongoose";

let Schema = mongoose.Schema;

let userSchema = new Schema({
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

userSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    findByEmail(email){
        return this.findOne({"local.email": email}).exec();
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
    }
};

module.exports = mongoose.model("user", userSchema);
