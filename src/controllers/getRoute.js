let getHome = (req, res)=>{
        res.render("index", {title: "homepage"});
    };

let getDashboard = (req, res)=>{
        res.render("dashboard", {title: "dashboard"});
    };

let getAuth = (req, res)=>{
        res.render("auth/auth", {title: "Authenticate"});
    };

module.exports = {
    getHome: getHome,
    getDashboard: getDashboard,
    getAuth: getAuth
};