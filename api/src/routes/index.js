const { Router } = require('express');
const publication = require('./publication.js');
const filtersAndOrders  = require ('./filtersAndOrders');
const postCreator = require ('./postCreator');
const userCreator = require ('./userCreator');
const deletePosts = require('./deletePost');
const favourites = require("./favourites");
const cart = require("./cart");
const admin = require("./admin");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAE TODAS LAS PUBLICACIONES O POR QUERY O POR MODELOS
router.use('/home', publication)

//CREAR PUBLICACIONES
router.use('/postCreator', postCreator)

//CREAR USUARIOS
router.use('/userCreator', userCreator)

//FILTRADOS
router.use('/filtersAndOrders', filtersAndOrders)

//elimina un posteo
router.use('/delete', deletePosts)

router.use("/favourites", favourites);

router.use("/cart", cart);

// RUTA EXCLUSIVA ADMINS
router.use('/admin', admin)

module.exports = router;
