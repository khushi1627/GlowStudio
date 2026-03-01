const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'GlowStudio Admin';

  if (!adminEmail || !adminPassword) {
    console.log('Admin seed skipped (ADMIN_EMAIL/ADMIN_PASSWORD not set)');
    return;
  }

  const exists = await User.findOne({ email: adminEmail.toLowerCase() });
  if (exists) return;

  const hashed = await bcrypt.hash(adminPassword, 10);
  await User.create({
    name: adminName,
    email: adminEmail.toLowerCase(),
    password: hashed,
    role: 'admin'
  });
  console.log(`Admin user created: ${adminEmail}`);
};

module.exports = seedAdmin;
