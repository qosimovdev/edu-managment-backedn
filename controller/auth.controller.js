const authService = require('../services/auth.service');
const { validateLogin } = require('../validation/auth.validation');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = validateLogin(req.body)
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validatsiya xatosi",
                error: error.details.map((err) => err.message)
            })
        }
        const { user, token } = await authService.login(email, password);
        res.status(200).json({
            message: 'Login successful',
            token,
            user
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(401).json({ message: err.message || 'Unauthorized' });
    }
}

exports.me = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.id);
        res.status(200).json({ user });
    } catch (err) {
        console.error("Get user error:", err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
}