const { Router } = require('express');
const publication = require('./publication.js');
const verification = require('./verification.js');
const banned = require('./banned.js');
const filtersAndOrders  = require ('./filtersAndOrders');
const user = require ('./user');
const favourites = require("./favourites");
const cart = require("./cart");
const admin = require("./admin");
const mercadopago = require('./mercadopago');
const order = require('./order');
const comprarealizada = require ('./compra-realizadas')
const sendEmail = require ('./sendEmail')

const preguntas = require('./preguntas');
const router = Router();

const correo = require('../controllers/auth')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAE TODAS LAS PUBLICACIONES O POR QUERY O POR MODELOS

router.use('/compra-realizada', comprarealizada)


router.use('/home', publication)

router.use('/verification', verification)

router.use('/banned', banned)

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

//RUTA FORMULARIO DE CORREO ELECTRONICO
router.use('/correo', correo);

//RUTA ENVIO DE PAGO
router.use('/sendEmail', sendEmail);
//RUTA PREGUNTAS Y RESPUESTAS
router.use('/pregunta',preguntas );

module.exports = router;
