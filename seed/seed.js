const { User } = require('../model');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
    const email = process.env.ADMIN_EMAIL;

    const existingAdmin = await User.findOne({ where: { email } });
    if (!existingAdmin) {
        const admin = await User.create({
            fullName: process.env.ADMIN_FULLNAME,
            email,
            password: process.env.ADMIN_PASSWORD,
            role: 'ADMIN'
        });
        console.log(`Admin yaratildi: ${email}`);
    }
};
createAdmin()