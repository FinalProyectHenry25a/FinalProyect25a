const Router = require("express");
const { Publication } = require("../db.js");

//const { Publication } = require("../db.js");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const newPost = Publication.create(req.body);

    res.send("Producto agregado exitosamente");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;

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
