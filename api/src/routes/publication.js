const Router = require('express');
const { Publication } = require('../db.js');
const { Op, where } = require('sequelize');

const router = Router()

router.get('/', async (req, res, next) => {
  const { modelo } = req.query;

  try {
    if (modelo) {
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
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {

  const { id } = req.params;

  try {

    let smartPhone = await Publication.findByPk(id);

    res.json(smartPhone);

  } catch (error) {

    next(error);

  }

})

router.put('/:id', async (req, res, next) => {

  const { id } = req.params;

  try {

    let stock = await Publication.findByPk(id);

    await Publication.update(

      { stock: stock.dataValues.stock - 1 },
      { where: { id: id } }

    );

    res.json("Stock modificado");

  } catch (error) {

    next(error);

  }

})

module.exports = router;