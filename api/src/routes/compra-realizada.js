const Router = require("express");
const { User, Publication } = require("../db");
const router = Router();



router.put("/:email/:id", async (req, res) => {
  
    try {
  
      const {email, id} = req.params
  
      let post = await Publication.findByPk(id)
      console.log('posttt', post);
  
      let usuario = await User.findByPk(email) 
      console.log('usuario', usuario.dataValues);
    
     
     if (usuario.dataValues.shopping === null){
      console.log('entreeeeeeeee');
  
      await User.update({ shopping: [post] }, { where: { email: email } });
      //await User.update({ cart: 'hola' }, { where: { email: email } });
     }
  
     /* else {
  
       await User.update(
         { shopping: usuario.dataValues.shopping.concat(post) },
         { where: { email: email } }
       );
  
     } */
  
      res.status(200).json("asd");
     
  
    } catch (error) {
      console.log(error.message);
    }
  });

  module.exports = router;