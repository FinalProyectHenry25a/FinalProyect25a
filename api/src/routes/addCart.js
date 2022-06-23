const Router = require('express');
const { User, Publication } = require('../db');

const router = Router();

router.post('/', async(req, res) => {
    const { email, id } = req.body;

    try {
        let persona = await User.findOne({
            where: {
                email: email 
            }
        }) 

        let cellphone = await Publication.findAll({
            where: {
                id: id
            }
        })

        await persona.addPublication(cellphone);

        res.status(200).send("added to cart");

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;