const { Router } = require('express');
const publication = require('./publication.js');
const filtersAndOrders  = require ('./filtersAndOrders');
const postCreator = require ('./postCreator');
const userCreator = require ('./userCreator');


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

//get de usuarios
//router.use('/users', users)


module.exports = router;
