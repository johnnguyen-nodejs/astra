import express from "express";
import {
    getHome, 
    getDashboard, 
    getAuth,
    postRegister,
    verifyAccount
} from "../controllers/getRoute";
import { authValid } from "../validation/index";
    

let router = express.Router();
/**
 * init routes 
 */
let initRouter = (app)=>{
    router.get('/', getHome );
    router.get('/dashboard', getDashboard );
    router.get('/auth', getAuth );
    router.get('/verify/:token', verifyAccount );
    router.post('/register', authValid.register, postRegister);
    app.use("/", router);
};
module.exports = initRouter;

