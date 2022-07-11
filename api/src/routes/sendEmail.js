const Router = require("express");
const { User } = require("../db");

const router = Router();

router.put("/:email", async (req, res) => {

    const { email } = req.params;
  
    try {

      await User.update( 
        
        { sendEmail: false } ,
        { where: { email: email } }
         
         );

      res.status(200).json("Verificacion satisfactoria!");

    } catch (error) {

      console.log(error);

    }

  });

module.exports = router;