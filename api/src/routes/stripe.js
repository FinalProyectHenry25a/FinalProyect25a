const Router = require("express");
const Stripe = require("stripe");

const router = Router();

const stripe = new Stripe("sk_test_51LKOR4GnBCHzlELLY7os4XTVhrWC8wNzWbgK4L6m7LUEFHRPcnkI2JV8yKVoAMiEglS90tPhChxvqUmBro2RMfZj00SjXpklnm");

router.post("/", async (req, res) => {

    try {

        const { id, amount } = req.body;
  
        const payment = await stripe.paymentIntents.create({

            amount,
            currency: "ARS",
            description: "Phone",
            payment_method: id,
            confirm: true

        });

        res.send({message: "Succesfull payment"});

    } catch (error) {

      console.log(error);
      
      res.send({message: error.raw.message});

    }

  });

module.exports = router;