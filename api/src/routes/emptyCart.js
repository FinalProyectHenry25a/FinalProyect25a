const Router = require("express");
const { Publication, User } = require("../db.js");

const router = Router();

router.put("/:email", async (req, res) => {

   const { email } = req.params;
 
   try {

    let usuario = await User.findByPk(email)
    
    for (let i = 0; i < usuario.cart.length; i++) {
        
        let publicacion = await Publication.findByPk(usuario.cart[i].id)
        await Publication.update({ stock: publicacion.stock - usuario.cart[i].qty }, { where: { id: usuario.cart[i].id } });
        await Publication.update({ qty: null }, { where: { id: usuario.cart[i].id } });
  
      }

    if(usuario.shopping === null) {
  
        await User.update({ shopping: usuario.cart, cart: null}, { where: { email: email } });
  
        } else {
    
          await User.update(
            { shopping: usuario.shopping.concat(usuario.cart), cart: null, emptyCart: true},
            { where: { email: email } }
          );
     
        }

   } catch (error) {

     console.log(error);

   }

 });


 module.exports = router;
