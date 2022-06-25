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
    let favoritos = await Publication.findAll({
      where: {
        id: id,
      },
    });

    if (!usuario.favourites) {
      await User.update({ favourites: favoritos }, { where: { email: email } });
    } else {
      await User.update(
        { favourites: usuario.favourites.concat(favoritos) },
        { where: { email: email } }
      );
    }

    res.send("agregado a favorito");
  } catch (error) {
    console.log(error);
  }
});

router.put("/delete/:email/:id", async (req, res) => {
  const { email, id } = req.params;

  try {
    let usuario = await User.findByPk(email);

    let destroy = usuario.favourites.filter((f) => f.id != id)

    if(usuario.favourites){
      await User.update({ favourites: destroy}, {where:{email: email}})
    }
    res.send("se saco de favoritos")
  } catch (error) {
    console.log(error)
  }

});

module.exports = router;
