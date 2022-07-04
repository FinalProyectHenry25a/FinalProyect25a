const Router = require("express");
const { Publication, User } = require("../db.js");
const { Op } = require("sequelize");

const router = Router();

router.get("/", async (req, res, next) => {
  const { model, brand } = req.query;

  try {
    if (model) {
      const findByModel = await Publication.findAll({
        where: {
          model: {
            [Op.iLike]: "%" + model + "%",
          },
        },
      });
      findByModel.length
        ? res.status(201).send(findByModel)
        : res.status(400).send("no se encontro ese modelo");
    } else {
      let publicaciones = await Publication.findAll();
      res.send(publicaciones);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    let smartPhone = await Publication.findByPk(id);

    res.json(smartPhone);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
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
});

router.put("/:email/:id", async (req, res) => {
  const { comentario, rating } = req.body;
  const { id, email } = req.params;

  try {
    let celular = await Publication.findByPk(id);
    let usuario = await User.findByPk(email);

    if (!celular.review) {
      await Publication.update(
        {
          review: [
            {
              usuario: usuario.username,
              comentario: comentario,
              rating: rating,
            },
          ],
        },
        { where: { id: id } }
      );
    } else {
      await Publication.update(
        {
          review: celular.review.concat({
            usuario: usuario.username,
            comentario: comentario,
            rating: rating,
          }),
        },
        { where: { id: id } }
      );
    }

    res.send("review agregada");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
