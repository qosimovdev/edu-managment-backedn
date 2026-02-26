module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        mentorId: { type: DataTypes.INTEGER, allowNull: false },
        startDate: { type: DataTypes.DATE, allowNull: true },
        schedule: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
    }, {
        timestamps: true
    });

    Group.associate = (models) => {
        // Mentor relation
        Group.belongsTo(models.User, {
            foreignKey: 'mentorId',
            as: 'mentor'
        });

        // Student relation
        Group.hasMany(models.Student, {
            foreignKey: 'groupId',
            as: 'students'
        });
    };

    return Group;
};