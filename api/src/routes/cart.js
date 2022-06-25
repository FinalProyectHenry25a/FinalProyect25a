const Router = require("express");
const { User, Publication } = require("../db");

const router = Router();

router.put("/:email/:id", async (req, res) => {
  const { email, id } = req.params;

  try {
    let usuario = await User.findByPk(email);
    let addCart = await Publication.findAll({
      where: {
        id: id,
      },
    });

    if (!usuario.cart) {
      await User.update({ cart: addCart }, { where: { email: email } });
    } 
    else {
      await User.update(
        { cart: usuario.cart.concat(addCart) },
        { where: { email: email } }
      );
    }
    res.send("agregado al carrito");
  } catch (error) {
    console.log(error);
  }
});

router.put("/delete/:email/:id", async (req, res) => {
  const { email, id } = req.params;

  try {
    let usuario = await User.findByPk(email);

    let destroy = usuario.cart.filter((f) => f.id != id)

    if(usuario.cart){
      await User.update({ cart: destroy}, {where:{email: email}})
    }
    res.send("se saco del carrito")
  } catch (error) {
    console.log(error)
  }

});

module.exports = router;