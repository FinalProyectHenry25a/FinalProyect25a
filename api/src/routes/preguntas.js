const Router = require('express');
const { Publication, User } = require('../db.js');


const router = Router();


router.put("/:email/:id", async (req, res) => {
    const {pregunta, respuesta} = req.body
    const {id, email}  = req.params;
  
     try {
      let celular = await Publication.findByPk(id);
      let usuario = await User.findByPk(email);
  
      if (!celular.QyA) {
        await Publication.update({ QyA:[{usuario: usuario.username, pregunta:pregunta, respuesta:respuesta}] }, { where: { id: id } });
   
      } else {
        
  
        await Publication.update(
          { QyA: celular.QyA.concat({usuario: usuario.username, pregunta:pregunta, respuesta:null}) },
          { where: { id: id } }
        );
       
      }
  
      res.send("pregunta enviada");
    } catch (error) {
      console.log(error);
    }
  });




module.exports = router;