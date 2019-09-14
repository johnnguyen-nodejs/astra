import express from "express";

let app = express();

let host = "localhost";
let port = 3000;

app.get('/', (req, res)=>{
    res.send("hello start project");
});

app.listen(port, host, ()=>{
    console.log(` listening on port: ${port}`);
});