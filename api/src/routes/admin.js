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

//RUTA PARA MODIFICAR STOCK     
router.post("/modifica-stock", async (req, res) => {
  try {
    let post = await Publication.findByPk(req.body.id);

    if (req.body.do === "add") {
      await Publication.update(
        { stock: post.dataValues.stock + req.body.amount },
        { where: { id: req.body.id } }
      );
    } else if (req.body.do === "remove") {
      await Publication.update(
        { stock: post.dataValues.stock - req.body.amount },
        { where: { id: req.body.id } }
      );
    }

    res.send("Modificacion exitosa");
  } catch (error) {
    res.status(404).send(error);
  }
});

/*
para probar y como ejemplo del body:
{
    "brand": "santi",
    "releaseDate": "alguna fecha",
    "model": "ssdcs",
    "price": 250,
    "rating": 5,
    "images": "slksdmlcsmk",
    "color": "rojo",
    "processor": "sdsfds",
    "ram":"4Gb",
    "rom":"32Gb",
    "network":"3G",
    "batery":6,
    "frontal_cam":5,
    "main_cam":7,
    "inches": 10,
    "screen": 11,
    "resolution":"sdsdf",
    "stock":5
} */

module.exports = router;
