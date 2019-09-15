let getHome = (req, res)=>{
        res.render("index", {title: "homepage"});
    };

let getDashboard = (req, res)=>{
        res.render("dashboard", {title: "dashboard"});
    };

module.exports = {
    getHome: getHome,
    getDashboard: getDashboard
};