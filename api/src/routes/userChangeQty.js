const Router = require("express");
const { User } = require("../db.js");

const router = Router();

router.post("/:email", async (req, res) => {

     const { actualCartWithQty, emailUser } = req.body;
  
    try {
     
        await User.update( { cart: actualCartWithQty }, { where: { email: emailUser } } );

        res.send("Actualizacion completada del carrito");

    } catch (error) {

      console.log(error);

    }

  });

module.exports = router;


