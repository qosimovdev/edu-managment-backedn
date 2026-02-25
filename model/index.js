const Sequelize = require("sequelize")
const sequelize = require("../config/db")

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db