<?php

require __DIR__ .  '/vendor/autoload.php';

MercadoPago\SDK::setAccessToken('TEST-5235813208193185-062415-57603c99d14d4cc824f1cad642db3d22-1148613223');

$preference = new MercadoPago\Preference();

$item = new MercadoPago\Item();
$item->id = '0001';
$item->title = 'Producto CDP';
$item->quantity = 1;
$item->unit_price = 150.00;
$item->currency_id = 'MXN';

$preference->items = array($item);
$preference->save();

?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script src="https://sdk.mercadopago.com/js/v21"></script>
</head>
<body>

<h3>Mercado Pago</h3>

<div class="checkout-btn"></div>

<script>
    const mp = new MercadoPago('TEST-d50a1f69-2774-4f3a-983f-197ca3c19ea4', {
        locale: 'es-MX'
    });

    mp.checkout({
        preference: {
            id: '<?php echo $preference->id; ?>'
        },
        render: {
            container: '.checkout-btn',
            label: 'Pagar con MP'
        }
    })
    
</body>
</html>