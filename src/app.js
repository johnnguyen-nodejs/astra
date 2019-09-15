require('dotenv').config();
import express from "express";
import connectDB from "./config/connectDB";
import viewConfig from "./config/viewEngine";
import initRouter from "./routes/index";

let app = express();
//config database
connectDB();
//config view engine
viewConfig(app);
//config routes
initRouter(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
    console.log(` listening on port: ${process.env.APP_PORT}`);
});