const Router = require ('express');
const { User } = require('../db');
const bcrypt = require("bcrypt");

const router = Router ();

router.post('/', async(req, res) => {

    const { email, password, username, address, firstname, lastname } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({

        email: email,
        password: hashedPassword,
        username: username,
        address: address,
        firstname: firstname,
        lastname: lastname
        
    })

    res.status(200).send("successfully created");
})


module.exports = router;