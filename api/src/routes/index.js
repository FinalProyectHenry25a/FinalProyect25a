const { Router } = require('express');
const publication = require('./publicacion.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/publication', publication)

module.exports = router;
