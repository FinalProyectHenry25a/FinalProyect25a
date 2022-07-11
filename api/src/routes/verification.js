<<<<<<< HEAD
const Router = require("express");
const { User } = require("../db");

const router = Router();

router.put("/:email", async (req, res) => {

    const { email } = req.params;
  
    try {

      await User.update( 
        
        { isVerified: true } ,
        { where: { email: email } }
         
         );

      res.status(200).json("Verificacion satisfactoria!");

    } catch (error) {

      console.log(error);

    }

  });

=======
const Router = require("express");
const { User } = require("../db");

const router = Router();

router.put("/:email", async (req, res) => {

    const { email } = req.params;
  
    try {

      await User.update( 
        
        { isVerified: true } ,
        { where: { email: email } }
         
         );

      res.status(200).json("Verificacion satisfactoria!");

    } catch (error) {

      console.log(error);

    }

  });

>>>>>>> d6fb09413b5b9f4728ce320f2dd6cf8286d0df35
module.exports = router;