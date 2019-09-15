require('dotenv').config();
import express from "express";
import connectDB from "./config/connectDB";
import viewConfig from "./config/viewEngine";

let app = express();
//config database
connectDB();
//config view engine
viewConfig(app);

app.get('/', (req, res)=>{
    res.render("index", {title: "homepage"});
});
app.get('/dashboard', (req, res)=>{
    res.render("dashboard", { title: "dashboard"});
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
    console.log(` listening on port: ${process.env.APP_PORT}`);
});