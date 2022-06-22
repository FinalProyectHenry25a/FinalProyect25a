require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preCargarBase } = require('./src/controllers/publicationControl.js');

conn.sync({ force: true }).then(() => {

  preCargarBase();

  server.listen(3001, () => {
    console.log('%s listening at 3001'); 
  });

});
