const Router = require("express");
const { User, Publication } = require("../db");
const router = Router();

router.put("/:email/:id", async (req, res) => {
  
    try {
  
      const {email, id} = req.params
  
      let post = await Publication.findByPk(id)
  
      let usuario = await User.findByPk(email) 
    
     if (usuario.dataValues.shopping === null){
  
      await User.update({ shopping: [post] }, { where: { email: email } });

     }
  
      res.status(200).json("asd");
     
    } catch (error) {
      console.log(error.message);
    }
  });

  module.exports = router;