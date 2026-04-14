const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists..." });
        };

        // hash pass
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        // create token
        const token = jwt.sign(
            { _id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" }
        );
        res.status(201).json({ message: "User registered successfully...", token, user })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found..." });
        }

        //  compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invald credentials..." })
        }

        //  create token 
        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email , role: user.role }, process.env.JWT_SECRET, { expiresIn: "10d" });

        res.status(200).json({
            message: "User login successfully...", token, user: { id: user._id,name: user.name, email: user.email , role: user.role  }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}