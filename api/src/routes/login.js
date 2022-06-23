const Router = require("express");
// const passport = require("passport");
const router = Router();
//const { User } = require('../db.js');

// const initializePassport = require("./passport-config")
// initializePassport(
//     passport,
//     email => User.findOne(user => user.email === email),
//     id => User.findOne(users => user.id === id)
// )


router.get("/", async (req, res) => {
   
});

// router.post("/", passport.authenticate("local", { 
//     successRedirect: "/home",
//     failureRedirect: "/",
//     failureFlash: true
//  }));

module.exports = router;