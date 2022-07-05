require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preCharge } = require('./src/controllers/publicationControl.js');

conn.sync({ force: true }).then(() => {

  preCharge();

  server.listen(8080, () => {
    console.log('%s listening at 8080'); 
  });

});
