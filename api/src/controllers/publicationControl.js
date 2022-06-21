const {Publicacion} = require("../db.js");
const data = require('../data/index.js')

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