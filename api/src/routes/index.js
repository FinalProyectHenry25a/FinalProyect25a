const { Router } = require('express');
const publication = require('./publication.js');
const verification = require('./verification.js');
const filtersAndOrders  = require ('./filtersAndOrders');
const user = require ('./user');
const favourites = require("./favourites");
const cart = require("./cart");
const admin = require("./admin");
const mercadopago = require('./mercadopago');
const order = require('./order');
const comprarealizada = require ('./compra-realizadas')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAE TODAS LAS PUBLICACIONES O POR QUERY O POR MODELOS
router.use('/home', publication)

router.use('/verification', verification)

//CREAR USUARIOS
router.use('/user', user)

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

//RUTA COMPRAS REALIZADAS
router.use('/compra-realizada', comprarealizada)

module.exports = router;
