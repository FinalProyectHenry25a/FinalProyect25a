<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="https://www.paypal.com/sdk/js?client-id=AfSmtkVG-M08HuDPhfUKO7U3oSF-ob57MiyNRJo796730_Z2kdiHlyAJpylvU0BxskO9P68gBUUJ0564&components=buttons&currency=USD"></script>

</head>
<body>

<div id="paypal-button-container"></div>

<script>
    paypal.Buttons({
        style:{
            layout: 'vertical',
            color:  'gold',
            shape:  'pill',
            label:  'paypal'
        },
        createOrder: function(data, actions) {
      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '100'
          }
        }]
      });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name);
    });
    },
    onCancel: function(data){
        alert("Pago cancelado")
        console.log(data);
    }
    }).render('#paypal-button-container');

</script>
    
</body>
</html>