const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('ADMIN', 'MENTOR'),
            defaultValue: 'MENTOR'
        }
    }, {
        timestamps: true
    });
    // Parolni tekshirish metodi
    User.prototype.checkPassword = function (password) {
        const bcrypt = require('bcrypt');
        return bcrypt.compare(password, this.password);
    };

    // Parolni saqlashdan oldin hash qilish
    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    });

    // Parolni yangilashda ham hash qilish
    User.beforeUpdate(async (user) => {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    return User;
};