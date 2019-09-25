require('dotenv').config();
import express from "express";
import connectDB from "./config/connectDB";
import viewConfig from "./config/viewEngine";
import initRouter from "./routes/index";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";
import live from "./hook/app";

// import pem from "pem";
// import https from "https";
// import path from "path";

// process.env.OPENSSL_CONF = path.join(__dirname, 'openssl', 'openssl.cnf')
// pem.config({
//     pathOpenSSL: path.join(__dirname, 'openssl','openssl.exe')
// });
// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err;
//     }
//     let app = express();
//     //config database
//     connectDB();
//     //config session
//     configSession(app);
//     //config view engine
//     viewConfig(app);
//     //config body parseur
//     app.use(bodyParser.urlencoded({ extended: true }));
//     //Enable err messages
//     app.use(connectFlash());
//     //config passport
//     app.use(passport.initialize());
//     app.use(passport.session());
//     //config routes
//     initRouter(app);
  
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
//         console.log(` listening on port: ${process.env.APP_PORT}`);
//     });
// });

let app = express();
//config database
connectDB();
//config session
configSession(app);
//config view engine
viewConfig(app);
//config body parseur
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Enable err messages
app.use(connectFlash());
//config passport
app.use(passport.initialize());
app.use(passport.session());
//config routes
initRouter(app);


app.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
    console.log(` listening on port: ${process.env.APP_PORT}`);
});