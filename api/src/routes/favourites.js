const { Router } = require("express");
const { User, Publication } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let usuarios = await User.findAll();

    res.send(usuarios);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:email/:id", async (req, res) => {
  const { email, id } = req.params;

  try {
    let usuario = await User.findByPk(email);
    let favorito = await Publication.findAll({
      where: {
        id: id,
      },
    });

    if (!usuario.favourites) {
      await User.update({ favourites: favorito }, { where: { email: email } });
    } 
    else {
      await User.update(
        { favourites: usuario.favourites.concat(favorito) },
        { where: { email: email } }
      );
    }

    res.send("agregado a favorito");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

