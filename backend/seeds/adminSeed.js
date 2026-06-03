require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin user already exists');
  } else {
    await User.create({ email: 'admin@example.com', password: 'admin123', role: 'Admin' });
    console.log('Admin user created (admin@example.com / admin123)');
  }

  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });

