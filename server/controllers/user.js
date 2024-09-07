import User from '../models/UserSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
    try {
        const { fName, lName, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let data = {
            fName,
            lName,
            email,
            password: hashedPassword,
            role,
            status: role === 'teacher' ? 'pending' : 'active'
        }
        const user = await User.create(data);
        await user.save()
        res.status(200).json({ message: 'User created successfully', success: true });
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
            res.cookie('x-auth-token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            res.status(201).json({ token, success: true, message: "Logged In Successfully!" })
        }
        else {
            res.status(400).json({ message: "Invalid Email or Password!", success: false })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false })
        }
        res.status(200).json({ user, success: true, message: "User verified successfully!" })
    } catch (error) {
        res.status(500).json({ error })
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
        res.status(200).json({ user, success: true, message: "User updated successfully!" })
    } catch (error) {
        res.status(500).json({ error })
    }
};