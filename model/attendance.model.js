module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('Attendance', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        studentId: { type: DataTypes.INTEGER, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        status: { type: DataTypes.ENUM('present', 'absent', 'late'), defaultValue: 'present' },
        note: { type: DataTypes.STRING, allowNull: true }
    }, {
        timestamps: true
    });

    Attendance.associate = (models) => {
        Attendance.belongsTo(models.Student, {
            foreignKey: 'studentId',
            as: 'student'
        });
    };

    return Attendance;
};