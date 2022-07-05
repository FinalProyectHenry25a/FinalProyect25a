require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preCharge } = require('./src/controllers/publicationControl.js');

conn.sync({ force: true }).then(() => {

  preCharge();
<<<<<<< HEAD
  
=======

>>>>>>> 410d545830ababc8eae15fcdea8ec56156fd8b94
  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });

});
