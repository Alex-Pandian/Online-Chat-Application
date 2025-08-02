const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { firstName, fullName, email, password } = req.body;

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

const createToken = (email) => {
    return jwt.sign({ id: email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'No such user'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = createToken(user.email);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ message: 'Login successful' });
    }
    catch(err){
        console.error('Server error', err);
        res.status(500).json({ message: 'Server error '});
    }
};