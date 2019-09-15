import mongoose from "mongoose";

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    gender: {
        type: String,
        default: "male"
    },
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
    }
};

module.exports = mongoose.model("user", userSchema);
