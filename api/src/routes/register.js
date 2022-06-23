const Router = require("express");
const bcrypt = require("bcrypt");
const { User } = require('../db.js');

// const initializePassport = require("./passport-config")
// initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(users => user.id === id)
// )

const router = Router();

// router.get("/", async (req, res) => {
   
// });

router.post("/", async (req, res) => {

    const { email, password, username, address, firstname, lastname } = req.body;
   
    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        let user = await User.create({

            email: email,
            username: username,
            password: hashedPassword,
            address: address,
            firstname: firstname,
            lastname: lastname

        })

        //res.redirect("/login");

        res.send("Success")
        
    } catch (error) {

        console.log(error);
        
    }


});
  

module.exports = router;