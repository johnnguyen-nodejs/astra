require('dotenv').config();
import express from "express";
import connectDB from "./config/connectDB";
import viewConfig from "./config/viewEngine";
import initRouter from "./routes/index";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import { configSession, sessionStore } from "./config/session";
import passport from "passport";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";

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

//init app
let app = express();
// init server with socket.io
let server = http.createServer(app);
let io = socketio(server);
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
app.use(cookieParser());
//config passport
app.use(passport.initialize());
app.use(passport.session());
//config routes
initRouter(app);
io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    success: (data, accept) => {
        if(!data.user.logged_in){
            return accept("Invalid User", false);
        }
        return accept(null, true);
    },
    fail: (data, message, error, accept) => {
        if(error){
            console.log("failed connection to socket.io: ", message );
            return accept(new Error(message), false);
        }
    }
}));

//config socket;
initSockets(io);


server.listen(process.env.APP_PORT, process.env.APP_HOST, ()=>{
    console.log(` listening on port: ${process.env.APP_PORT}`);
});