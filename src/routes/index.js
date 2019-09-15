import express from "express";
import {
    getHome, 
    getDashboard, 
    getAuth
} from "../controllers/getRoute";
    

let router = express.Router();
/**
 * init routes 
 */
let initRouter = (app)=>{
    router.get('/', getHome );
    router.get('/dashboard', getDashboard );
    router.get('/auth', getAuth );
    app.use("/", router);
};
module.exports = initRouter;

