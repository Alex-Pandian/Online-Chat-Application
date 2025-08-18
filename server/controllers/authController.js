const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { firstName, fullName, email, password } = req.body;
    console.log(req.body);

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, fullName, email, password: hashedPassword, about: `I am ${firstName}`, profilePhoto : 'default.png'});
        await user.save();
        res.status(201).json({ message: 'Account created.'});
    }
    catch(err){
        res.status(500).json({ error : err.message});
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
  
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
  
    try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "User not found" });
	
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: "Invalid password" });
	
		const token = createToken(user._id);
	
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
      
        res.json({ user: { email: user.email } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
      
};
  
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
    
        res.json({ user: { email: user.email, name: user.firstName, photo: user.profilePhoto } });
    } catch (err) {
        console.error('Auth check error:', err);
        res.status(500).json({ error: 'Server error during auth check' });
    }
    
};
  
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};