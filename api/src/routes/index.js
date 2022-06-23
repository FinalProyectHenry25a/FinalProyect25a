const { Router } = require('express');
const publication = require('./publication.js');
const filtersAndOrders  = require ('./filtersAndOrders');
const postCreator = require ('./postCreator');
const userCreator = require ('./userCreator');
const deletePosts = require('./deletePost');
<<<<<<< HEAD
const { route } = require('./publication.js');
const  register  = require("./register")
const  login  = require("./login")
const users = require("./users");
=======
const addCart = require('./addCart');
>>>>>>> ff866ac77d0e642e0a19b9a50138719d70e299ab


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/login", login)

router.use("/register", register)

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

//agregar al carrito
router.use('/addCart', addCart);

//get de usuarios
router.use('/users', users)


module.exports = router;
