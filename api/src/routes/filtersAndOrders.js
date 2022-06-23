const Router = require("express");
const { Publication } = require("../db.js");
const router = Router();

router.get("/", async (req, res) => {

  try {
    let forFilter = await Publication.findAll();

    const { byRam, byRom, byBrand, byPrice, byNetwork, byProcessor, byOrder } =
      req.body;

    //usar con select en el front
    if (byRam !== null) {
      forFilter = forFilter.filter((el) => el.ram === byRam);
    }

    //usar con select en el front
    if (byRom !== null) {
      forFilter = forFilter.filter((el) => el.rom === byRom);
    }

    //usar con select en el front
    if (byBrand !== null) {
      forFilter = forFilter.filter((el) => el.brand === byBrand);

      //precio minimo y maximo en un array; elemplo [500, 1000]
      if (byPrice && byPrice[0] < byPrice[1])
        forFilter = forFilter.filter(
          (el) => el.price >= byPrice[0] && el.price <= byPrice[1]
        );
    }

    //byNetwork
    if (byNetwork !== null) {
      forFilter = forFilter.filter((el) => el.network === byNetwork);
    }

    //byProcessor - busca por letras ramdom
    if (byProcessor !== null) {
      forFilter = forFilter.filter((el) =>
        el.processor.toLowerCase().includes(byProcessor.toLowerCase())
      );
    }

    //ordenamientos
    if (byOrder) {
      if (byOrder === "rating") {
        forFilter = forFilter.sort((el1, el2) => el2.rating - el1.rating);
      }

      if (byOrder === "ascendingPrice") {
        forFilter = forFilter.sort((el1, el2) => el1.price - el2.price);
      }

      if (byOrder === "descending price") {
        forFilter = forFilter.sort((el1, el2) => el2.price - el1.price);
      }
    }

    if (forFilter.length !== 0) res.send(forFilter);
    else res.send ('No se encontraron artículos com esas características')
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;

/*
body a recibir (campos vacios poner null)
   {
    "byBrand":"Samsung",                                         franco
    "byRam": null,                                               "4Gb" "6Gb" "8Gb" "12Gb"
    "byRom":                                                     "64Gb" "128Gb" "256Gb"
    "byPrice":                                                   [0, 500]
    "byNetwork":                                                 "4G" o "5G"              
    "byProcessor":"asd",                                         busca por caracter
    "byOrder": "rating" "ascendingPrice" "descending price"      (únicas 3 opciones)
}
*/
