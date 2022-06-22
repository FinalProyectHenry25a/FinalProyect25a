const Router = require ('express');
const {User } = require('../db');

const router = Router ();

router.post('/', async(req, res) => {
    const { email, password, username, address, firstname, lastname } = req.body;

    await User.create({
        email,
        password,
        username,
        address,
        firstname,
        lastname
    })

    res.status(200).send("successfully created");
})


module.exports = router;