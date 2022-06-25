const { Router } = require("express");
const { Publication, User } = require("../db");

const router = Router();

//RUTA PARA VER LAS PUBLICACIONES
router.get("/posts", async (req, res) => {
  try {
    let posts = await Publication.findAll();

    posts.length
      ? res.status(200).send(posts)
      : res.status(400).send("no se encuentran posts");
  } catch (error) {
    console.log(error);
  }
});

//RUTA PARA VER LOS USUARIOS
router.get("/users", async (req, res) => {
  try {
    let users = await User.findAll();

    users.length
      ? res.status(200).send(users)
      : res.status(400).send("no se encuentran posts");
  } catch (error) {
    console.log(error);
  }
});

//RUTA PARA ELIMINAR POSTS POR ID
router.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Publication.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("successfully removed");
  } catch (error) {
    console.log(error);
  }
});

//RUTA PARA ELIMINAR USUARIOS POR SU PRIMARY KEY
router.delete("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    await User.destroy({
      where: {
        email: email,
      },
    });
    res.status(200).send("successfully removed");
  } catch (error) {
    console.log(error);
  }
});

//RUTA PARA CREAR PUBLICACIONES
router.post("/post", async (req, res) => {
  try {
    await Publication.create(req.body);

    res.send("Producto agregado exitosamente");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
