import express from "express";
import {
    getHome, 
    getDashboard, 
    getAuth,
    postRegister
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
    router.post('/register', authValid.register, postRegister);
    app.use("/", router);
};
module.exports = initRouter;

