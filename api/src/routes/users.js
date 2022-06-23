const Router = require("express");
const {User} = require("../db.js");
const router = Router();

 router.get("/", async (req, res, next) => {

    try {

    let users = await User.findAll();

    console.log(users,"soy el get de users");

    res.json(users)
        
    } catch (error) {

        next(error);
        
    }

 });

module.exports = router;