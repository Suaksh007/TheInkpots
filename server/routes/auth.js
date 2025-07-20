const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Assign admin role if this is your email
    const role = email === "theinkpots0102@gmail.com" ? "admin" : "user";

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,  // ← include the role
    });

    // Save user
    const user = await newUser.save();
    res.status(201).json({ message: "User created successfully!" });

  } catch (err) {
  if (err.code === 11000) {
    return res.status(400).json({ message: "Email already exists" });
  }
  res.status(500).json(err);}
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Email not registered" });

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid password" });

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email,  role: user.role } });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
