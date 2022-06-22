const {Publicacion} = require("../db.js");
const data = require('../data/databaseFake.js');

const preCargarBase = async () => {
    try {
        await Publicacion.bulkCreate(data)
        console.log("exito")
    } catch (error) {
        console.log(error)

    }
}

module.exports = {
    preCargarBase
} 