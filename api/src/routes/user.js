const Router = require("express");
const { User } = require("../db");

const router = Router();


// TRAE UN USUARIO POR EMAIL

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    console.log(email);
    
    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    console.log(user);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let users = await User.findAll();
    
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { email, username, address, firstname, lastname } = req.body;
  
  await User.create({
    email: email,
    username: username,
    address: address,
    firstname: firstname,
    lastname: lastname,
  });

  res.status(200).send("successfully created");
});

//EDITA DATOS DEL USUARIO

router.put("/:email/edit", async (req, res) => {
  const { email } = req.params;
  const { username, address, firstname, lastname } = req.body;

  try {
    let usuario = await User.findOne({
      where: {
        email: email,
      },
    });

    if (usuario) {
      await User.update(
        { username, address, firstname, lastname },
        { where: { email: email } }
      );
    }
    res.status(200).send("los cambios se dieron con exito");
  } catch (error) {
    console.log(error);
  }
});

// ASIGNA PUNTUACION !! pendiente a terminar
//http://localhost:3001/user/rating/33/33

router.put("/rating/:user/:rate", async (req, res) => {

  try {
    const { user, rate } = req.params;
   /* 

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
    } */

    res.status(200).send('puntuacion');
  } catch (error) {
    console.log(error);
  }
});

//CAMBIA IMAGEN DEL USUARIO

router.put("/cambiarImagen", async (req, res) => {
  try {
    const { user, image } = req.body;

    await User.update({ image: image }, { where: { email: user } });

    res.status(200).send("Operación exitosa");
  } catch (error) {
    console.log(error);
  }
});

/*  CON FIREBASE ESTA RUTA NO ES NECESARIA

router.put("/changePassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await User.findOne({
      where: {
        email: email,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (usuario.password) {
      await User.update({ hashedPassword }, { where: { email: email } });
    }
    res.status(200).send("se cambio la contraseña con exito");
  } catch (error) {
    console.log(error);
  }
}); */

module.exports = router;
