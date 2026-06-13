require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes')
const seedAdmin = require('./seeds/adminSeed'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes)

const PORT = process.env.PORT || 5004;

connectDB().then(async () => {
  // Auto-seed admin after DB connects — only creates if not exists
  await seedAdmin();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});