const jwt = require('jsonwebtoken');
const { User } = require('../model');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d';

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.checkPassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );

    const { password: _, ...safeUser } = user.toJSON();

    return { user: safeUser, token };
};