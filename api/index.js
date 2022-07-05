require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preCharge } = require('./src/controllers/publicationControl.js');

conn.sync({ force: true }).then(() => {

  preCharge();
  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });

});
