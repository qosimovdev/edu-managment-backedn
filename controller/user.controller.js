const { User } = require('../model');
const { validateRegister } = require('../validation/user.validation');

exports.createMentor = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const { error } = validateRegister(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validatsiya xatosi",
                error: error.details.map((err) => err.message)
            })
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Bu email bilan user mavjud' });
        }
        const mentor = await User.create({ fullName, email, password, role: 'MENTOR' });
        const { password: _, ...mentorData } = mentor.toJSON();
        res.status(201).json({ message: 'Mentor yaratildi', mentor: mentorData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getMentors = async (req, res, next) => {
    try {
        const mentors = await User.findAll({
            where: { role: 'MENTOR' },
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ mentors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
}