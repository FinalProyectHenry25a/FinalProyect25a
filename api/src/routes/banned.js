<<<<<<< HEAD
const Router = require("express");
const { User } = require("../db");

const router = Router();

router.put("/:email", async (req, res) => {

    const { email } = req.params;
  
    try {

      await User.update( 
        
        { banned: true } ,
        { where: { email: email } }
         
         );

      res.status(200).json("Baneado satisfactoriamente");

    } catch (error) {

      console.log(error);

    }

  });

router.put("/unban/:email", async (req, res) => {

    const { email } = req.params;
  
    try {

      await User.update( 
        
        { banned: false } ,
        { where: { email: email } }
         
         );

      res.status(200).json("Unban satisfactorio");

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
        
        { banned: true } ,
        { where: { email: email } }
         
         );

      res.status(200).json("Baneado satisfactoriamente");

    } catch (error) {

      console.log(error);

    }

  });

router.put("/unban/:email", async (req, res) => {

    const { email } = req.params;
  
    try {

      await User.update( 
        
        { banned: false } ,
        { where: { email: email } }
         
         );

      res.status(200).json("Unban satisfactorio");

    } catch (error) {

      console.log(error);

    }

  });

>>>>>>> d6fb09413b5b9f4728ce320f2dd6cf8286d0df35
module.exports = router;