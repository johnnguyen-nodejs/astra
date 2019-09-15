require('dotenv').config();
import express from "express";
import connectDB from "./config/connectDB";
import viewConfig from "./config/viewEngine";
import initRouter from "./routes/index";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";

let app = express();
//config database
connectDB();
//config session
configSession(app);
//config view engine
viewConfig(app);
//config body parseur
app.use(bodyParser.urlencoded({ extended: true }));
//Enable err messages
app.use(connectFlash());
//config routes
initRouter(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
    console.log(` listening on port: ${process.env.APP_PORT}`);
});