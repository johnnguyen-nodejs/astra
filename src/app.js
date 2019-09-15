require('dotenv').config();
import express from "express";
import connectDB from "./config/connectDB";
import userModel from "./models/user.model";

let app = express();
connectDB();

app.get('/', async (req, res)=>{
    try {
        let item = {
            username: "tuan dep trai",   
        }; 
        let newUser = await userModel.createNew(item);   
        res.send(`new user : ${newUser.username}`);
    } catch (err) {
        console.log(err);
    }
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
    console.log(` listening on port: ${process.env.APP_PORT}`);
});