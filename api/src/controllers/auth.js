
const { transporter } = require('../helpers/nodeEmailer')
const Router = require("express"); 
const router = Router();
const { body } = require('express-validator');
const { validacioncampos } = require('../middlewares/validador-de-campos')

router.post("/", 
body('contact_user','El nombre es obligatorio').notEmpty(),
body('correo_user','El correo es obligatorio').isEmail(),
body('asunto_user','El asunto es obligatorio').notEmpty(),
body('descripcion_user','la descripsion es obligatoria').notEmpty(),
validacioncampos, async (req, res) => {
    const {contact_user,correo_user, asunto_user,descripcion_user } = req.body;
    console.log(req.body)
    try {
        await transporter.sendMail({
            from: `"${contact_user}" <finalproyect25a@gmail.com>`, // sender address
            to: correo_user, // list of receivers
            subject: `${asunto_user} -> 25a-front.vercel.app`, // Subject line
            text: "", // plain text body,
            html:`<b>de: </b>${correo_user}
            <br></br>
            <p>${descripcion_user}</p>
            `
          });
          return res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
        });
    }
});

module.exports = router;