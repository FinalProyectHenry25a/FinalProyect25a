const Router = require("express");
const { User, Publication } = require("../db");
const router = Router();

//AGREGA COMPRAS REALIZADAS

router.put("/:email/:id", async (req, res) => {

  try {
    const { email, id } = req.params;

    let post = await Publication.findByPk(id);
    console.log("posttt", id);

    let usuario = await User.findByPk(email);

    if (usuario.dataValues.shopping === null) {

      await User.update({ shopping: [post] }, { where: { email: email } });

    } else {

      await User.update(
        { shopping: usuario.dataValues.shopping.concat(post) },
        { where: { email: email } }
      );
    }

    res.status(200).send('Compra registrada');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
