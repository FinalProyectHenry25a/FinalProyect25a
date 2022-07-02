const { Order_detail, Order } = require("../db.js");

const { PROD_ACCESS_TOKEN } = process.env;

const router = require("express").Router();

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// const { route } = require('./order');

mercadopago.configure({
  sandbox: true,
  access_token: PROD_ACCESS_TOKEN
});
router.post('/', async(req, res, next) => {
  try{
  const {items}=req.body
  
  const preference = {
      auto_return: "approved",
      external_reference: 'orderId',
      items: items,
      payer: {
          name: "user-name",
          surname: "user-surname",
          email: "maty.britez7@gmail.com",
          date_created: "",
          phone: {
              area_code: '11',
              number: 4444-4444
          },
          identification: {
              type: "RUT", 
              number: '12345678'
          },
          address: {
              street_name: "Street",
              street_number: 123,
              zip_code: '5700'
          }
      },
      //notification_url: 'https://e2d1-190-107-20-98.ngrok.io/success',
      back_urls: {
          success: "http://localhost:3000/",
      }, 
      shipments: {
          receiver_address: { 
              zip_code: "5700",
              street_number: 123,
              street_name: "Street",
              floor: '4',
              apartment: "C"
          }
      },
  }
  mercadopago.preferences
     .create(preference)
      .then(function (response) {
       console.info("respondio");
       // Este valor reemplazará el string"<%= global.id %>" en tu HTML
       global.id = response.body.id;
        console.log(response.body.items);
        res.json({ id: global.id, init_point: response.body.init_point });
      })
  
  }catch(error){
      next(error)
  }
})


// const id_orden= 1


// router.post("/", (req, res, next) => {
//   mercadopago.configure({
//     access_token: PROD_ACCESS_TOKEN,
//   });

//    // Crea un objeto de preferencia
//    let preference = {
//      items: [
//        {
//          brand: req.body.brand,
//          model: req.body.model,
//          price: req.body.price,
//          quantity: req.body.qty,
//       },
//      ],
//      external_reference: `${id_orden}`, //`${new Date().valueOf()}`,
//     back_urls: {
//        success: "http://localhost:3000/mercadopago/pagos",
//        failure: "http://localhost:3000/mercadopago/pagos",
//        pending: "http://localhost:3000/mercadopago/pagos",
//     },
//   };
//    mercadopago.preferences
//     .create(preference)
//      .then(function (response) {
//       console.info("respondio");
//        // Este valor reemplazará el string"<%= global.id %>" en tu HTML
//        global.id = response.body.id;
//        console.log(response.body.items);
//        res.json({ id: global.id, init_point: response.body.init_point });
//      })
//    .catch(function (error) {
//       console.log(error);
//    });
// });

 router.get("/pagos/:id", (req, res) => {
   const mp = new mercadopago(PROD_ACCESS_TOKEN);
    const id = req.params.id;
  console.info("Buscando el id", id);
   mp.get(`/v1/payments/search`, { status: "pending" }) //{"external_reference":id})
     .then((resultado) => {
        console.info("resultado", resultado);
        res.json({ resultado: resultado });
      })
         .catch((err) => {
        console.error("No se consulto:", err);
        res.json({
          error: err,
       });
      });
  });

  router.get("/pagos", (req, res) => {  
    console.info("EN LA RUTA PAGOS ", req);
    const payment_id = req.query.payment_id;
    const payment_status = req.query.status;
   const external_reference = req.query.external_reference;
   const merchant_order_id = req.query.merchant_order_id;
    console.log("EXTERNAL REFERENCE ", external_reference);

// //  //Aquí edito el status de mi orden
    Order.findByPk(external_reference)
     .then((order) => {
       order.payment_id = payment_id;
       order.payment_status = payment_status;
        order.merchant_order_id = merchant_order_id;
       order.status = "created";
       console.info("Salvando order");
        order
          .save()
          .then((_) => {
            console.info("redirect success");

           return res.redirect("http://localhost:3000");
          })
          .catch((err) => {
           console.error("error al salvar", err);
         return res.redirect(
              `http://localhost:3000/?error=${err}&where=al+salvar`
            );
          });
      })
      .catch((err) => {
        console.error("error al buscar", err);
        return res.redirect(
          `http://localhost:3000/?error=${err}&where=al+buscar`
       );
      });

   //proceso los datos del pago
   // redirijo de nuevo a react con mensaje de exito, falla o pendiente
  res.send(`${payment_id} ${payment_status} ${external_reference} ${merchant_order_id} `)
  });

module.exports = router;
