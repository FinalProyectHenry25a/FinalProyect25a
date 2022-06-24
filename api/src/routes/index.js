const { Router } = require('express');
const publication = require('./publication.js');
const filtersAndOrders  = require ('./filtersAndOrders');
const postCreator = require ('./postCreator');
const userCreator = require ('./userCreator');
const deletePosts = require('./deletePost');
const favourites = require("./favourites");
const cart = require("./cart");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//trae todas la publicaciones o por query por modelo
router.use('/home', publication)

//crea una publicacion
router.use('/postCreator', postCreator)

//crea un usuario 
router.use('/userCreator', userCreator)

//filtrados
router.use('/filtersAndOrders', filtersAndOrders)

//elimina un posteo
router.use('/delete', deletePosts)

//get de usuarios
router.use('/users', users)

router.use("/favourites", favourites);

router.use("/cart", cart);


module.exports = router;
