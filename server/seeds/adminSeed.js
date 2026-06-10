const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function seedAdmin() {
  try {
    const existing = await Admin.findOne({ email: 'admin@example.com' });
    if (existing) {
      console.log('Admin already exists, skipping seed.');
      return;
    }

    const admin = new Admin({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'Admin'
    });

    await admin.save();
    console.log('Admin seeded successfully:', admin.email);
  } catch (err) {
    console.error('Admin seed error:', err.message);
  }
}

module.exports = seedAdmin;