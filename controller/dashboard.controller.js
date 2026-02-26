const { Group, Student, Payment, Attendance, User, Sequelize } = require('../model');
const { Op } = Sequelize;

exports.getDashboard = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        let groups;

        if (req.user.role === 'ADMIN') {
            groups = await Group.findAll({
                include: [
                    { model: Student, as: 'students', attributes: ['id', 'fullName', 'balance'] },
                    { model: User, as: 'mentor', attributes: ['id', 'fullName', 'email'] }
                ]
            });
        } else if (req.user.role === 'MENTOR') {
            groups = await Group.findAll({
                where: { mentorId: req.user.id },
                include: [
                    { model: Student, as: 'students', attributes: ['id', 'fullName', 'balance'] },
                    { model: User, as: 'mentor', attributes: ['id', 'fullName', 'email'] }
                ]
            });
        }

        const summary = await Promise.all(groups.map(async (group) => {
            const studentIds = group.students.map(s => s.id);

            // Payment filter by date
            const paymentWhere = { studentId: { [Op.in]: studentIds } };
            if (startDate && endDate) {
                paymentWhere.paymentDate = { [Op.between]: [startDate, endDate] };
            }

            const payments = await Payment.findAll({ where: paymentWhere, attributes: ['amount'] });
            const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);

            // Attendance filter by date
            const attendanceWhere = { studentId: { [Op.in]: studentIds } };
            if (startDate && endDate) {
                attendanceWhere.date = { [Op.between]: [startDate, endDate] };
            }

            const attendanceRecords = await Attendance.findAll({ where: attendanceWhere });
            const presentCount = attendanceRecords.filter(a => a.status === 'present').length;
            const attendancePercentage = attendanceRecords.length > 0
                ? ((presentCount / attendanceRecords.length) * 100).toFixed(2)
                : null;

            return {
                groupId: group.id,
                groupName: group.name,
                mentor: group.mentor,
                studentCount: group.students.length,
                totalPayments,
                attendancePercentage
            };
        }));

        res.status(200).json({ summary });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}