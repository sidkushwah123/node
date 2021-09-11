const cc = require("../cntrl/ct");
const ex = require("express");
const t = ex.Router();

t.route("/").get(cc.home);
    

module.exports=t;