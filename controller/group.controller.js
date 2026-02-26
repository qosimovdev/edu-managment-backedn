const { Group, User, Student } = require('../model');

exports.createGroup = async (req, res) => {
    try {
        const { name, mentorId, startDate, schedule, status } = req.body;
        if (!name || !mentorId) {
            return res.status(400).json({ message: 'name va mentorId required' });
        }
        const mentor = await User.findOne({ where: { id: mentorId, role: 'MENTOR' } });
        if (!mentor) return res.status(404).json({ message: 'Mentor topilmadi' });
        const group = await Group.create({ name, mentorId, startDate, schedule, status });
        res.status(201).json({ message: 'Group yaratildi', group });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getGroups = async (req, res) => {
    try {
        let groups;
        if (req.user.role === 'ADMIN') {
            groups = await Group.findAll({
                include: [
                    { model: User, as: 'mentor', attributes: ['id', 'fullName', 'email'] },
                    { model: Student, as: 'students' }
                ],
                order: [['createdAt', 'DESC']]
            });
        } else if (req.user.role === 'MENTOR') {
            groups = await Group.findAll({
                where: { mentorId: req.user.id },
                include: [
                    { model: User, as: 'mentor', attributes: ['id', 'fullName', 'email'] },
                    { model: Student, as: 'students' }
                ],
                order: [['createdAt', 'DESC']]
            });
        }
        res.status(200).json({ groups });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mentorId, startDate, schedule, status } = req.body;
        const group = await Group.findByPk(id);
        if (!group) return res.status(404).json({ message: 'Group topilmadi' });
        if (mentorId) {
            const mentor = await User.findOne({ where: { id: mentorId, role: 'MENTOR' } });
            if (!mentor) return res.status(404).json({ message: 'Mentor topilmadi' });
            group.mentorId = mentorId;
        }
        group.name = name || group.name;
        group.startDate = startDate || group.startDate;
        group.schedule = schedule || group.schedule;
        group.status = status || group.status;
        await group.save();
        res.status(200).json({ message: 'Group yangilandi', group });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findByPk(id);
        if (!group) return res.status(404).json({ message: 'Group topilmadi' });
        await group.destroy();
        res.status(200).json({ message: 'Group ochirildi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}