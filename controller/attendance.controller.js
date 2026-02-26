const { Attendance, Student, Group } = require('../model');

exports.createAttendance = async (req, res) => {
    try {
        const { studentId, date, status, note } = req.body;
        if (!studentId || !date) {
            return res.status(400).json({ message: 'studentId va date required' });
        }
        const student = await Student.findByPk(studentId, {
            include: { model: Group, as: 'group' }
        });
        if (!student) return res.status(404).json({ message: 'Student topilmadi' });
        if (req.user.role === 'MENTOR' && student.group.mentorId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const attendance = await Attendance.create({ studentId, date, status, note });
        res.status(201).json({ message: 'Attendance qoshildi', attendance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.getAttendance = async (req, res) => {
    try {
        let attendances;
        if (req.user.role === 'ADMIN') {
            attendances = await Attendance.findAll({
                include: [
                    { model: Student, as: 'student', attributes: ['id', 'fullName'] }
                ],
                order: [['date', 'DESC']]
            });
        } else if (req.user.role === 'MENTOR') {
            attendances = await Attendance.findAll({
                include: [
                    {
                        model: Student,
                        as: 'student',
                        include: {
                            model: Group,
                            as: 'group',
                            where: { mentorId: req.user.id }
                        },
                        attributes: ['id', 'fullName']
                    }
                ],
                order: [['date', 'DESC']]
            });
        }
        res.status(200).json({ attendances });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, note } = req.body;
        const attendance = await Attendance.findByPk(id, {
            include: { model: Student, as: 'student', include: { model: Group, as: 'group' } }
        });
        if (!attendance) return res.status(404).json({ message: 'Attendance topilmadi' });
        attendance.status = status || attendance.status;
        attendance.note = note || attendance.note;
        await attendance.save();
        res.status(200).json({ message: 'Attendance yangilandi', attendance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findByPk(id);
        if (!attendance) return res.status(404).json({ message: 'Attendance topilmadi' });
        await attendance.destroy();
        res.status(200).json({ message: 'Attendance ochirildi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}