const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ✅ Find admin by email
    const admin = await Admin.findOne({ email });
    console.log('👤 Admin found:', admin ? 'YES' : 'NO');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('🔑 Stored hash starts with:', admin.password?.substring(0, 10));

    // ✅ Compare password
    const isMatch = await admin.comparePassword(password);
    console.log('✅ Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // ✅ Return 'admin' key (not 'user') — matches authStore
    res.json({
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role }
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};