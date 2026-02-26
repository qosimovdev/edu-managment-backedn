const { Student, Group, User } = require('../model');

exports.createStudent = async (req, res) => {
    try {
        const { fullName, phone, groupId, joinedDate } = req.body;
        if (!fullName || !phone || !groupId) {
            return res.status(400).json({ message: 'fullName, phone va groupId required' });
        }
        const group = await Group.findByPk(groupId);
        if (!group) return res.status(404).json({ message: 'Group topilmadi' });
        const student = await Student.create({
            fullName,
            phone,
            groupId,
            joinedDate: joinedDate || new Date(),
            status: 'active',
            balance: 0
        });
        res.status(201).json({ message: 'Student yaratildi', student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getStudents = async (req, res) => {
    try {
        let students;
        if (req.user.role === 'ADMIN') {
            students = await Student.findAll({
                include: [
                    {
                        model: Group,
                        as: 'group',
                        include: [
                            { model: User, as: 'mentor', attributes: ['id', 'fullName', 'email'] }
                        ]
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
        } else if (req.user.role === 'MENTOR') {
            students = await Student.findAll({
                include: [
                    {
                        model: Group,
                        as: 'group',
                        where: { mentorId: req.user.id },
                        include: [
                            { model: User, as: 'mentor', attributes: ['id', 'fullName', 'email'] }
                        ]
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
        }
        res.status(200).json({ students });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, phone, groupId, status, balance } = req.body;

        const student = await Student.findByPk(id);
        if (!student) return res.status(404).json({ message: 'Student topilmadi' });

        if (groupId) {
            const group = await Group.findByPk(groupId);
            if (!group) return res.status(404).json({ message: 'Group topilmadi' });
            student.groupId = groupId;
        }
        student.fullName = fullName || student.fullName;
        student.phone = phone || student.phone;
        student.status = status || student.status;
        student.balance = balance ?? student.balance;
        await student.save();
        res.status(200).json({ message: 'Student yangilandi', student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) return res.status(404).json({ message: 'Student topilmadi' });
        await student.destroy();
        res.status(200).json({ message: 'Student ochirildi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}