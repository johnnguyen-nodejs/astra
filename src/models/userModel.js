import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    refferer: {
        type: String,
        default: null
    },
    parent: String ,
    balance: {
        type: Number, 
        default: 0
    },
    revenue: {
        type: Number, 
        default: 0
    },
    invester: {
        type: Number, 
        default: 0
    },
    wallet:{
        type: String, 
        default: '0x0'
    },
    avatar: {
        type: String,
        default: "default.png"
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

UserSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    findByEmail(email){
        return this.findOne({"local.email": email}).exec();
    },
    findByRole(role){
        return this.findOne({"role": role}).exec();
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
    },
    updateUser(id, item){
        return this.findByIdAndUpdate(id, item).exec();
    },   
    updatePassword  (id, hashedPassword){
        return this.findByIdAndUpdate(id, {"local.password": hashedPassword}).exec();
    },
    updateWallet  (id, wallet){
        return this.findByIdAndUpdate(id, {"wallet": wallet}).exec();
    },
    updateAgencyAwait (id, role){
        return this.findByIdAndUpdate(id, {"role": role}).exec();
    },
    viewAgency(role){
        return this.find({"role": role}, "_id local.email phone address balance revenue invester").exec();
    },
    findAll(){
        return this.find({},'_id local.email phone address balance invester revenue').exec();
    },
    // get balance and tree system 
    Deposit(wallet, amount){
        this.findOneAndUpdate({wallet:wallet},{$inc:{balance: amount}},{new: true},(err,result)=>{
          this.AddRevenue(result.parent,amount);
        })
    },

    IncreaseInvester(parent){
        if(parent !== ''){
            this.findOneAndUpdate({refferer:parent},{$inc:{invester: 1}},{new: true},(err,user)=>{
                this.IncreaseInvester(user.parent);
            });
        } 
    },
      
    AddRevenue(parent,add){
        if (parent != '') {
          this.findOneAndUpdate({refferer: parent},{$inc:{revenue: add}},{new: true},(err,result)=>{
            this.AddRevenue(result.parent,add);
          })
        }
    },
};

UserSchema.methods = {
    comparePassword(password){
        return bcrypt.compare(password, this.local.password);
    }
};

module.exports = mongoose.model("user", UserSchema);
