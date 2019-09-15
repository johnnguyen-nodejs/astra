import express from "express";
import {getHome, getDashboard} from "../controllers/getRoute";

let router = express.Router();
/**
 * init routes 
 */
let initRouter = (app)=>{
    router.get('/', getHome );
    router.get('/dashboard', getDashboard );
    app.use("/", router);
};
module.exports = initRouter;

