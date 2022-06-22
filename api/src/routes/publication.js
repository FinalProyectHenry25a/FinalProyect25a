const Router = require('express');
const {Publication} = require('../db.js');
const { Op } = require('sequelize');

const router = Router()

router.get('/', async (req, res) => {
    const { modelo } = req.query;

    try {
        if(modelo){
            const findByName = await Publication.findAll({
                where: {
                  modelo: {
                    [Op.iLike]: "%" + modelo + "%",
                  },
                },
              });

              findByName.length
              ? res.status(201).send(findByName)
              : res.status(400).send("no se encontro por ese nombre")
        }
        else {
            let publicaciones = await Publication.findAll();
            res.send(publicaciones);
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;