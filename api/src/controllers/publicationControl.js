const {Publication} = require("../db.js");
const data = require('../data/databaseFake.js');

const preCharge = async () => {
    try {
        await Publication.bulkCreate(data)
        console.log("exito")
    } catch (error) {
        console.log(error)

    }
}

module.exports = {
    preCharge
} 