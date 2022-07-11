const { Order_detail , Order , User, Publication } = require('../db.js');

const {
    PROD_ACCESS_TOKEN,
  } = process.env;

const server = require('express').Router();
  // SDK de Mercado Pago
const mercadopago = require ('mercadopago');


server.post("/", async (req, res, next)=>{

  let email = req.body.pop()

  const cart = req.body

  for (let i = 0; i < cart[0].length; i++) {
    
    await Publication.update({ qty: cart[0][i].qty }, { where: { id: cart[0][i].id } });

  }
  // cargamos el carrido de la bd

  // Agrega credenciales
mercadopago.configure({
    access_token: PROD_ACCESS_TOKEN
  });
  
  const items_ml = cart[0].map(i => ({
    title: `${i.brand} ${i.model}`,
    unit_price: i.price,
    quantity: i.qty,
  }))

  console.info('carrito', items_ml)
  // Crea un objeto de preferencia
  let preference = {
    items: items_ml,
    external_reference : `${email}`, //`${new Date().valueOf()}`,
    back_urls: {
      success: 'http://localhost:3001/mercadopago/pagos',
      failure: 'http://localhost:3001/mercadopago/pagos',
      pending: 'http://localhost:3001/mercadopago/pagos',
    }
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
    console.info('respondio')
  // Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    //console.log(response.body)
    res.json({id: global.id, init_point: response.body.init_point});
  }).catch(function(error){
    console.log(error);
  })


}) 

server.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago (PROD_ACCESS_TOKEN)
  const id = req.params.id
  //console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'})//{"external_reference":id})
  .then(resultado  => {
    //console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })

})

server.get("/pagos", async  (req, res)=>{

  const payment_id= req.query.payment_id
  const payment_status= req.query.status // ESTADO DE LA OPERACION
  const external_reference = req.query.external_reference // MAIL DE USUARIO
  const merchant_order_id= req.query.merchant_order_id
  // console.log(req.query);

  try {

    if(payment_status === "approved") {

      let usuario = await User.findByPk(external_reference)
  
      for (let i = 0; i < usuario.cart.length; i++) {
        
        let publicacion = await Publication.findByPk(usuario.cart[i].id)
        await Publication.update({ stock: publicacion.stock - publicacion.qty }, { where: { id: usuario.cart[i].id } });
        await Publication.update({ qty: null }, { where: { id: usuario.cart[i].id } });
  
      }
  
      if(usuario.shopping === null) {
  
      await User.update({ shopping: usuario.cart, cart: null, emptyCart: true, sendEmail: true}, { where: { email: external_reference } });
      const getInfo = await User.findByPk(external_reference)

      } else {
  
        await User.update(
          { shopping: usuario.shopping.concat(usuario.cart), cart: null, emptyCart: true, sendEmail: true },
          { where: { email: external_reference } }
        );
         const getInfo = await User.findByPk(external_reference)
   
      }

      return res.redirect("http://localhost:3000/home")
  
    }

    if(payment_status === "cancelled") {

      console.log("Su pago fue cancelado");
      return res.redirect("http://localhost:3000/home")
      
    }
    
  } catch (error) {
    

    console.log(error);
    console.log("Hubo algun error con su pago y no pudo ejecutarse");
    return res.redirect("http://localhost:3000/home")

  }

})


module.exports = server;