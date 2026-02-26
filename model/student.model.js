module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        fullName: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        groupId: { type: DataTypes.INTEGER, allowNull: false },
        joinedDate: { type: DataTypes.DATE, allowNull: true },
        status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
        balance: { type: DataTypes.FLOAT, defaultValue: 0 }
    }, {
        timestamps: true
    });

    Student.associate = (models) => {
        Student.belongsTo(models.Group, {
            foreignKey: 'groupId',
            as: 'group'
        });
    };

    return Student;
};