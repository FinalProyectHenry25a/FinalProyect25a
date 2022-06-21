require('dotenv').config();
const server = require('./src/app.js');
const datos = require("./src/data/databaseFake.js");
const { conn, Publicacion } = require('./src/db.js');
// const cargaDeDatosFicticia = require('./src/utils/cargaDeDatosFicticia');

const cargaDeDatosFicticia = async () => {

  try {
    
    await Publicacion.bulkCreate(datos);

  } catch (error) {

    console.log(error);
    
  }

}

conn.sync({ force: true }).then(() => {

  cargaDeDatosFicticia();

  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });
});
