module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        studentId: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        paymentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        method: { type: DataTypes.ENUM('cash', 'card', 'online'), defaultValue: 'cash' },
        note: { type: DataTypes.STRING, allowNull: true }
    }, {
        timestamps: true
    });

    Payment.associate = (models) => {
        Payment.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'student'
        });
    };

    return Payment;
};