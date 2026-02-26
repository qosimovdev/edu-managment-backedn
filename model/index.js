const Sequelize = require("sequelize")
const sequelize = require("../config/db")

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require("./user.model")(sequelize, Sequelize.DataTypes)
db.Student = require("./student.model")(sequelize, Sequelize.DataTypes)
db.Group = require("./group.model")(sequelize, Sequelize.DataTypes)
db.Payment = require("./payment.model")(sequelize, Sequelize.DataTypes)
db.Attendance = require("./attendance.model")(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
module.exports = db