const { Payment, Student } = require('../model');

exports.createPayment = async (req, res) => {
    try {
        const { studentId, amount, paymentDate, method, note } = req.body;
        // if (!studentId || !amount) {
        //     return res.status(400).json({ message: 'studentId va amount required' });
        // }
        const student = await Student.findByPk(studentId);
        if (!student) return res.status(404).json({ message: 'Student topilmadi' });
        const payment = await Payment.create({ studentId, amount, paymentDate, method, note });
        student.balance = (student.balance || 0) + amount;
        await student.save();
        res.status(201).json({ message: 'Payment yaratildi', payment, studentBalance: student.balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getPayments = async (req, res) => {
    try {
        let payments;
        if (req.user.role === 'ADMIN') {
            payments = await Payment.findAll({
                include: [
                    { model: Student, as: 'student', attributes: ['id', 'fullName', 'balance'] }
                ],
                order: [['paymentDate', 'DESC']]
            });
        } else if (req.user.role === 'MENTOR') {
            payments = await Payment.findAll({
                include: [
                    {
                        model: Student,
                        as: 'student',
                        where: { mentorId: req.user.id },
                        attributes: ['id', 'fullName', 'balance']
                    }
                ],
                order: [['paymentDate', 'DESC']]
            });
        }
        res.status(200).json({ payments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}