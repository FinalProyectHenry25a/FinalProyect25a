const { Router } = require('express');
const publication = require('./publication.js');
const filtersAndOrders  = require ('./filtersAndOrders');
const userCreator = require ('./userCreator');
const favourites = require("./favourites");
const cart = require("./cart");
const admin = require("./admin");
const mercadopago = require('./mercadopago');
const order = require('./order');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAE TODAS LAS PUBLICACIONES O POR QUERY O POR MODELOS
router.use('/home', publication)

//CREAR USUARIOS
router.use('/userCreator', userCreator)

//FILTRADOS
router.use('/filtersAndOrders', filtersAndOrders)

//RUTA FAVORITOS
router.use("/favourites", favourites);

//RUTA CARRITO
router.use("/cart", cart);

//RUTA EXCLUSIVA ADMINS
router.use('/admin', admin)

//RUTA MERCADOPAGO
router.use('/mercadopago', mercadopago);
router.use('/order', order);

module.exports = router;
