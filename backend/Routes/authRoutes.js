import Express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../Model/userModel.js"; // Ensure your model is correctly named and imported

dotenv.config(); // Load environment variables

const router = Express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10; // Default to 10 rounds if not defined

// Register Route
router.post("/register", async (req, res) => {
    try {
        console.log("register")
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({success:"false", message: 'All fields are required' });
        }

        // Check if the email is already registered
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({success:"false", message: 'Email already in use' });
        }

        // Hash the password with bcrypt and salt rounds from .env
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create a new user
        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success:"true",message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success:"false",message: 'Server error' });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success:"false",message: 'All fields are required' });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success:"false",message: 'Invalid email or password' });
        }

        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success:"false", message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            success:"true"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error',success:"false", });
    }
});

export default router;
